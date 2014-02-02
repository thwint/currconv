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
    id: page

    function addCurrency(id,country,currency,code,symbol,available,position){
        currencyModel.append({
                                 "uid": id,
                                 "country":country,
                                 "currency":currency,
                                 "code":code,
                                 "symbol":symbol,
                                 "available":available,
                                 "position":position,
                                 "letter":country.substring(0,1)
                             })
    }

    Component.onCompleted: {
        DB.getRemainingCurrencies(true);
    }
    Component.onDestruction: {

    }

    ListModel {
        id: currencyModel
    }
    Component {
        id: sectionHeading
        Rectangle {
            width: page.width
            height: childrenRect.height
            color: Theme.highlightColor
            Text {
                text: section
                font.bold: true
            }
        }
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
        PushUpMenu {
            spacing: Theme.paddingLarge
            MenuItem {
                text: qsTr("Return to Top")
                onClicked: currencyList.scrollToTop()
            }
        }

        VerticalScrollDecorator {}

        section.property: "letter"
        section.criteria: ViewSection.FullString
        section.delegate: sectionHeading

        delegate: Item {
            id: currencyListItem
            property bool menuOpen: contextMenu != null && contextMenu.parent === currencyListItem
            property int myIndex: index
            property Item contextMenu

            height: menuOpen ? contextMenu.height + contentItem.height : contentItem.height
            width: ListView.view.width

            function remove() {
                var maxPos = DB.getMaxPos();
                DB.addCurrency(uid,maxPos+1);
                mainPage.reloadQuotes();
                currencyModel.remove(index);
                mainPage.reloadModel();
            }

            CountryItem {
                id: contentItem
                width: parent.width
                countryName: country

                onClicked: {
                    console.log("Clicked "+country)
                    remove();
                }
            }
        }
    }
}
