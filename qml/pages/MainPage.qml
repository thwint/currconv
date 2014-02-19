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
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../components"
import "../dbconfig.js" as DB
import "../webrequest.js" as WEB

Page {
    id: mainPage

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
        DB.getDisplayCurrencies();
        fromCurr=DB.getSetting("fromCurr");
        lastUpdate = DB.getSetting("lastUpdate");
        amt=parseFloat(DB.getSetting("amount"));
    }
    /**************************************************************************
     * Reload quotes
     *************************************************************************/
    function reloadQuotes(){
        WEB.getQuotes();
    }

    Component.onCompleted: {
        WEB.rateNotifier.dataChanged.connect(mainPage.reloadModel);
        timeout.start()
        mainPage.reloadModel();
    }
    Timer {
        id: timeout
        interval: 3000

        onTriggered: {
            interval = 3000
            reloadModel();
        }
    }
    ListModel {
        id: currencyModel
    }

    SilicaListView {
        id: currencyList
        width: mainPage.width
        height: mainPage.height
        anchors.top: parent.top
        model: currencyModel
        header: PageHeader { title: qsTr("Currency Calculator") }
        ViewPlaceholder {
            enabled: currencyList.count == 0
            text: qsTr("Please add a currency")
        }
        /**********************************************************************
         * Pulldown menu
         *********************************************************************/
        PullDownMenu {
            MenuItem {
                text: qsTr("About")
                onClicked: pageStack.push(Qt.resolvedUrl("AboutPage.qml"))
            }
            MenuItem {
                text: qsTr("Add currency")
                onClicked: {
                    pageStack.push(Qt.createComponent("CurrencyPage.qml"));
                }
            }
            MenuItem {
                text: qsTr("Refresh rates")
                onClicked: mainPage.reloadQuotes();
            }
        }
        /**********************************************************************
         * Pushup menu
         *********************************************************************/
        PushUpMenu {
            spacing: Theme.paddingLarge
            MenuItem {
                text: qsTr("Return to Top")
                onClicked: currencyList.scrollToTop()
            }
        }
        VerticalScrollDecorator {}

        Label{
            y: 80
            anchors {
                right: parent.right
                rightMargin:Theme.paddingLarge
            }
            font.pixelSize: Theme.fontSizeExtraSmall*0.7
            text: qsTr("Last updated: ")+mainPage.lastUpdate
        }
        delegate: Item {
            id: currencyListItem
            property bool menuOpen: contextMenu != null && contextMenu.parent === currencyListItem
            property int myIndex: index
            property Item contextMenu

            /******************************************************************
             * Store new position in database
             *****************************************************************/
            onMyIndexChanged: {
                DB.updatePosition(uid,index);
            }

            height: menuOpen ? contextMenu.height + contentItem.height : contentItem.height
            width: ListView.view.width
            /******************************************************************
             * Remove currency from list and hide in database
             *****************************************************************/
            function remove() {
                var removal = removalComponent.createObject(currencyList)
                ListView.remove.connect(removal.deleteAnimation.start)
                removal.execute(contentItem, "Deleting", function() {
                    DB.hideCurrency(uid);
                    DB.deleteRate(code);
                    currencyModel.remove(index);
                } )
            }
            /******************************************************************
             * Enable rearrangement buttons
             *****************************************************************/
            function enableButtons(){
                upButton.visible=true;
                downButton.visible=true;
                doneButton.visible=true;
            }
            /******************************************************************
             * Move item to new position
             *****************************************************************/
            function moveItem(nextPos){
                if (nextPos>=0 && nextPos<currencyList.count){
                    currencyModel.move(index,nextPos,1)
                }
            }
            function createFloat(floatNumber){
                floatNumber.indexOf(',') !== -1;

            }

            CurrencyItem {
                id: contentItem
                width: parent.width
                currID: uid
                countryName: country
                currCode: code
                currName:currency
                symbol: symbol
                currAmount: amt*DB.getRate(fromCurr+code)
                anchors.leftMargin: Theme.paddingSmall

                onPressAndHold: {
                    if (!contextMenu)
                        contextMenu = contextMenuComponent.createObject(currencyListItem)
                    contextMenu.show(currencyListItem)
                }
                onClicked: {
                    var dialog = pageStack.push("AmountDialog.qml", {"amount": amt})
                    dialog.accepted.connect(function() {
//                        var german = Qt.locale("de_DE");
//                        var d
//                        d = Number.fromLocaleString(Qt.locale(),dialog.amount)
//                        console.log("Number: "+d)
//                        console.log(Qt.locale().name)
                        text: qsTr("Date %1").arg(Date().toLocaleString(Qt.locale()))
                        amt = parseFloat(dialog.amount)
//                        amt = parseFloat(d)
                        if (amt>0){
                            mainPage.fromCurr = currCode
                            DB.storeSetting("fromCurr",currCode)
                        }
                    })
                }
                IconButton {
                    id: upButton
                    icon.source: "image://theme/icon-l-up"
                    visible: false
                    anchors{
                        right:downButton.left
                    }

                    onClicked:{
                        moveItem(index-1)
                    }
                }
                IconButton {
                    id: downButton
                    icon.source: "image://theme/icon-l-down"
                    visible: false
                    anchors{
                        right:doneButton.left
                    }
                    onClicked:{
                        moveItem(index+1)
                    }
                }
                IconButton {
                    id: doneButton
                    icon.source: "image://theme/icon-l-right"
                    visible: false
                    anchors{
                        right:parent.right
                    }
                    onClicked:{
                        upButton.visible=false
                        downButton.visible=false
                        doneButton.visible=false
                    }
                }

            } // end contentItem
            /******************************************************************
             * Display animation
             *****************************************************************/
            Component {
                id: removalComponent
                RemorseItem {
                    property QtObject deleteAnimation: SequentialAnimation {
                        PropertyAction { target: currencyListItem; property: "ListView.delayRemove"; value: true }
                        NumberAnimation {
                            target: currencyListItem
                            properties: "height,opacity"; to: 0; duration: 300
                            easing.type: Easing.InOutQuad
                        }
                        PropertyAction { target: currencyListItem; property: "ListView.delayRemove"; value: false }
                    }
                    onCanceled: destroy()
                }
            }
            /**********************************************************************
             * Context menu for currency items
             *********************************************************************/
            Component {
                id: contextMenuComponent
                ContextMenu {
                    id: menu
                    MenuItem {
                        text: qsTr("Delete record")
                        onClicked: {
                            menu.parent.remove();
                        }
                    }
                    MenuItem {
                        text: qsTr("Rearrange currencies")
                        onClicked: {
                            menu.parent.enableButtons();
                        }
                    }
                }
            } // end contextMenuComponent
        } // end currencyListItem
    } // end currencyList
}
