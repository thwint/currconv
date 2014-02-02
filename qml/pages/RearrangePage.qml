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

Page {
    id: page

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

    Component.onCompleted: {
        // Initialize the database
        // get muliple quotes from yahoo
        // http://finance.yahoo.com/d/quotes.csv?e=.csv&f=c4l1&s=EURUSD=X,GBPUSD=X
        DB.initialize();
        DB.getRemainingCurrencies();
    }

    ListModel {
        id: currencyModel
    }

    // To enable PullDownMenu, place our content in a SilicaFlickable
    SilicaListView {
        id: currencyList
        model: currencyModel
        header: PageHeader { title: qsTr("Currency Converter") }
//        anchors.fill: parent
        width: page.width
        height: page.height
        anchors.top: parent.top

        ViewPlaceholder {
            enabled: currencyList.count == 0
            text: qsTr("Please add a currency")
        }

        // PullDownMenu and PushUpMenu must be declared in SilicaFlickable, SilicaListView or SilicaGridView
        PullDownMenu {
            MenuItem {
                text: qsTr("Refresh rates")
                onClicked: pageStack.push(Qt.resolvedUrl("AboutPage.qml"))
            }
            MenuItem {
                text: qsTr("Add currency")
                onClicked: pageStack.push(Qt.resolvedUrl("CurrencyPage.qml"))
            }
            MenuItem {
                text: qsTr("About")
                onClicked: pageStack.push(Qt.resolvedUrl("AboutPage.qml"))
            }
        }
        VerticalScrollDecorator {}

        delegate: Item {
            id: currencyListItem
            property bool menuOpen: contextMenu != null && contextMenu.parent === currencyListItem
            property int myIndex: index
            property Item contextMenu
//            height: childrenRect.height

            height: menuOpen ? contextMenu.height + contentItem.height : contentItem.height
            width: ListView.view.width

            function remove() {
                var removal = removalComponent.createObject(currencyList)
                ListView.remove.connect(removal.deleteAnimation.start)
                removal.execute(contentItem, "Deleting", function() { DB.hideCurrency(uid); currencyModel.remove(index); } )
            }

//            BackgroundItem {
            CurrencyItem {
                id: contentItem
                width: parent.width
                countryName: country
                currCode: code
                currName:currency
                symbol:symbol
                //                available:available
                //                position:position
                //                rate:rate
                //                lastupdate:lastupdate

                //                //                x: Theme.paddingLarge
                //                //                width: parent.width - 2*Theme.paddingLarge
                //                //                height: childrenRect.height

                onPressAndHold: {
                    console.log("Clicked "+country)
                    if (!contextMenu)
                        contextMenu = contextMenuComponent.createObject(currencyListItem)
                    contextMenu.show(currencyListItem)
                }
                Label{
                    text: country
                }
            }

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
                }
            }
        }
    }
}
