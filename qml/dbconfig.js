/******************************************************************************
 *  Copyright 2014 Tom Winterhalder
 *
 *  This file is part of Currency Converter.
 *
 *  Currency Converter is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by the
 *  Free Software Foundation, either version 3 of the License, or (at your
 *  option) any later version.
 *
 *  Currency Converter is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 *  or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 *  more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with Currency Converter. If not, see http://www.gnu.org/licenses/.
 *****************************************************************************/
.import QtQuick.LocalStorage 2.0 as LS
/*
 * get database connection
 */
function getDatabase() {
    return LS.LocalStorage.openDatabaseSync("CurrCalc", "0.1", "StorageDatabase", 100000);
}
/******************************************************************************
 * Get last max position from database
 *****************************************************************************/
function getMaxPos(){
    var db = getDatabase();
    var retVal = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT max(position) as pos FROM currencies');
        if (rs.rows.length > 0){
            retVal = rs.rows.item(0).pos
        } else {
            retVal = 1
        }
    })
    return retVal
}

/******************************************************************************
 * Add currency to selected currencies
 *****************************************************************************/
function addCurrency(uid,maxPos){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('UPDATE currencies SET position=? where id=?',[maxPos,uid]);
    })
}

/******************************************************************************
 * read value from settings table
 *****************************************************************************/
function getSetting(key){
    var db = getDatabase();
    var retVal = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT value FROM settings WHERE key=?',[key]);
        if (rs.rows.length > 0){
            retVal = rs.rows.item(0).value
        } else {
            retVal = qsTr("Unknown")
        }
    })
    return retVal
}
/******************************************************************************
 * store key/value-pair to settings table
 *****************************************************************************/
function storeSetting(key,value){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO settings VALUES (?,?);',[key,value]);
    })
}
/******************************************************************************
 * get a single rate
 *****************************************************************************/
function getRate(symbol){
    var db = getDatabase();
    var retVal = "";
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT rate FROM rates WHERE symbol=?',[symbol]);
        if (rs.rows.length > 0){
            retVal = rs.rows.item(0).rate;
        } else if (symbol.substring(0,3).localeCompare(symbol.substring(3))===0){
            // return 1 if rate is something like USDUSD
            retVal = 1;
        } else {
            // in any other case the correct rate is unknown
            retVal = "Unknown"
        }
    })
    return retVal
}
/******************************************************************************
 * store exchange rate in table
 *****************************************************************************/
function storeRate(symbols,rate){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('INSERT OR REPLACE INTO rates VALUES (?,?);',[symbols,rate]);
    })
}
/******************************************************************************
 * Delete exchange rates containing one symbol
 *****************************************************************************/
function deleteRate(symbol){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('DELETE FROM rates WHERE symbol LIKE ?;',"%"+symbol+"%");
    })
}
/******************************************************************************
 * update currency position
 *****************************************************************************/
function updatePosition(currID,newPosition){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('UPDATE currencies SET position=? WHERE id=?;',[newPosition,currID]);
    })
}
/******************************************************************************
 * get list of currencies which are not on mainpage
 *****************************************************************************/
function getRemainingCurrencies(){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT * FROM currencies WHERE available=1 AND (position IS NULL OR position<0) ORDER BY country;');
        for (var i = 0; i < rs.rows.length; i++){
            page.addCurrency(rs.rows.item(i).id,rs.rows.item(i).country,rs.rows.item(i).currency,rs.rows.item(i).code,rs.rows.item(i).symbol,rs.rows.item(i).available,rs.rows.item(i).position)
        }
    })
}
/******************************************************************************
 * select all currencies that are available (enabled) and have a position
 *****************************************************************************/
function getDisplayCurrencies(){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT * FROM currencies WHERE available=1 AND position>=0 ORDER BY position;');
        for (var i = 0; i < rs.rows.length; i++){
            mainPage.addCurrency(rs.rows.item(i).id,rs.rows.item(i).country,rs.rows.item(i).currency,rs.rows.item(i).code,rs.rows.item(i).symbol,rs.rows.item(i).available,rs.rows.item(i).position)
        }
    })
}
/******************************************************************************
 * select first three currencies that are available (enabled) and have a
 * position. Only used for coverPage
 *****************************************************************************/
function getTopThreeCurrencies(){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT * FROM currencies WHERE available=1 AND position>=0 and position < 3 ORDER BY position;');
        for (var i = 0; i < rs.rows.length; i++){
            coverPage.addCurrency(rs.rows.item(i).id,rs.rows.item(i).country,rs.rows.item(i).currency,rs.rows.item(i).code,rs.rows.item(i).symbol,rs.rows.item(i).available,rs.rows.item(i).position)
        }
    })
}
/******************************************************************************
 * remove a currency from selected list
 *****************************************************************************/
function hideCurrency(id){
    var db = getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('UPDATE currencies SET position=null WHERE id=?;',id);
    })
}
