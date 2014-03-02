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
.import "dbconfig.js" as DB
var rateNotifier = Qt.createQmlObject('import QtQuick 2.0; QtObject { signal dataChanged() }', Qt.application, 'rateNotifier');
/******************************************************************************
 * get quotes from Yahoo
 *****************************************************************************/
function getQuote(quote){
    var http = new XMLHttpRequest()
    var url = 'http://download.finance.yahoo.com/d/quotes.csv?{quote}&f=s0l1&e=.csv'.replace('{quote}', quote);
//    console.log(url);
    http.open("GET", url, true);

    // Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() { // Call a function when the state changes.
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        var response=http.responseText.split("\n")
                        for (var i =0; i<response.length-1;i++){
                            var symbol=response[i].toString().split(",")[0].substring(1,7)
                            var rate=response[i].toString().split(",")[1]
                            DB.storeRate(symbol,rate)
                        }
                        var now = new Date();
                        var dateTime = Qt.formatDateTime(now,"yyyy-MM-dd hh:mm:ss");
                        DB.storeSetting("lastUpdate",dateTime);
                        rateNotifier.dataChanged();
                    } else {
                        notify.show(qsTr("Error downloading quotes ")+http.status,3000)
                    }
                }
            }
    http.ontimeout = function() {
        notify.show(qsTr("Request timed out"),3000)
    }

    http.send();
}

/******************************************************************************
 * get quotes for all enabled currencies
 *****************************************************************************/
function getQuotes(){
    var currConv="s="
    var isFirst=true
    var response;

    var db = DB.getDatabase();
    db.transaction(function(tx) {
        var rs = tx.executeSql('SELECT * FROM currencies WHERE available=1 AND position>=0 ORDER BY position;');
        for (var i = 0; i < rs.rows.length; i++){
            for (var j = 0; j < rs.rows.length; j++){
                if(rs.rows.item(i).code.localeCompare(rs.rows.item(j).code)){
                    if(isFirst){
                        isFirst=false
                    } else {
                        currConv+=","
                    }
                    currConv += rs.rows.item(i).code+rs.rows.item(j).code+"=X"
                }
            }
        }
    })
    response=getQuote(currConv)
}
