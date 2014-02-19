/******************************************************************************
 *  Copyright 2014 Tom Winterhalder
 *
 *  This file is part of Currency Calculator.
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
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../dbconfig.js" as DB
import "../webrequest.js" as WEB
import "../components"

CoverBackground {
    id: coverPage

    property double amt
    property string fromCurr
    property string lastUpdate
    /**************************************************************************
     * Add currency element to model
     *************************************************************************/
    function addCurrency(id,country,currency,code,symbol,available,position){
        currencyModel.append({
                                 "uid": id,
                                 "country":country,
                                 "currency":currency,
                                 "code":code,
                                 "symbol":symbol,
                                 "available":available,
                                 "position":position
                             })

    }
    /**************************************************************************
     * Clear model and reload settings
     *************************************************************************/
    function reloadModel(){
        currencyModel.clear();
        DB.getTopThreeCurrencies();
        fromCurr=DB.getSetting("fromCurr");
        lastUpdate = DB.getSetting("lastUpdate");
        amt=parseFloat(DB.getSetting("amount"));
    }
    function reloadQuotes(){
        WEB.getQuotes();
        reloadModel();
    }

    Component.onCompleted: {
        WEB.rateNotifier.dataChanged.connect(coverPage.reloadModel);
        coverPage.reloadModel();
    }

    Image {
        id: logo
        fillMode: Image.PreserveAspectCrop
        source: "../images/harbour-currencycalculator.png"
        anchors.horizontalCenter: parent.horizontalCenter
        y:20
    }
    Label{
        id: lastUpdated
        anchors {
            left: parent.left
            leftMargin:Theme.paddingSmall
            top: logo.bottom
        }
        font.pixelSize: Theme.fontSizeExtraSmall*0.6
        text: qsTr("Last updated: ")+coverPage.lastUpdate
    }

//    Label {
//        id: label
//        width: parent.width - 2*Theme.paddingLarge
//        anchors.leftMargin: Theme.paddingSmall
//        anchors.top: logo.bottom
//        font.pixelSize: Theme.fontSizeSmall
//        wrapMode: Text.WordWrap
//        text: "Currency Calculator 0.3"
//    }
    ListModel {
        id: currencyModel
    }
    SilicaListView {
        id: currencyList
        model: currencyModel
        width: coverPage.width
        height: childrenRect.height
        anchors.top: lastUpdated.bottom
        ViewPlaceholder {
            enabled: currencyList.count == 0
            text: qsTr("No currencies to show")
        }
        delegate: Item{
            height:30
            CoverItem {
                id: contentItem
                width: parent.width
                currID: uid
                currCode: code
                currAmount: amt*DB.getRate(fromCurr+code)
                anchors.leftMargin: Theme.paddingSmall
            }
        } // end CurrencyItem
    } // end SilicaListView
    CoverActionList {
        id: coverAction

        CoverAction {
            iconSource: "image://theme/icon-m-refresh"
            onTriggered: {
                console.log("Refresh clicked" )
                coverPage.reloadQuotes();
            }
        }
    }
}
