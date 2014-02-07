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
    property string searchString
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
                                 "position":position,
                                 "letter":country.substring(0,1)
                             })
    }

    Component.onCompleted: {
        DB.getRemainingCurrencies(true);
    }

    ListModel {
        id: currencyModel
    }

    Column {
        id: headerContainer

        width: page.width

        PageHeader {
            title: qsTr("Currency Calculator")
        }

        SearchField {
            id: searchField
            width: parent.width

            Binding {
                target: page
                property: "searchString"
                value: searchField.text.toLowerCase().trim()
            }
        }
    }

    /**************************************************************************
     * Header for section
     *************************************************************************/
    Component {
        id: sectionHeading
        Rectangle {
            width: page.width
//            height: childrenRect.height
            height:0
            color: Theme.highlightColor
            anchors.leftMargin: Theme.paddingSmall
            visible: false
            Text {
                text: section
                font.bold: true
                visible:false
            }
        }
    }
    SilicaListView {
        id: currencyList
        model: currencyModel
        header: Item {
            id: header
            width: headerContainer.width
            height: headerContainer.height
            Component.onCompleted: headerContainer.parent = header
        }

//        header: PageHeader { title: qsTr("Currency Calculator") }
        width: page.width
        height: page.height
        anchors.top: parent.top
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

        /**********************************************************************
          * Grouping countries by first letter
          *********************************************************************/
        section {
            property: "letter"
            criteria: ViewSection.FullString
            delegate: sectionHeading
        }
        delegate: Item {
            id: currencyListItem
            property int myIndex: index


            height: contentItem.visible ? contentItem.height : 0
            width: ListView.view.width
            /******************************************************************
             * Remove currency from list, set position in database and
             * reload model
             *****************************************************************/
            function remove() {
                var maxPos = DB.getMaxPos();
                DB.addCurrency(uid,maxPos+1);
                mainPage.reloadQuotes();
                currencyModel.remove(index);
                mainPage.reloadModel();
            }

            function containString(compareString){
                if (searchString.length>0){
                    return compareString.toLowerCase().indexOf(searchString) !== -1
                } else {
                    return true
                }
            }

            CountryItem {
                id: contentItem
                width: parent.width
                countryName: country
                anchors.leftMargin: Theme.paddingSmall

                visible: containString(countryName)

                onClicked: {
                    searchField.text =""
                    remove();
                }
            }
        } // end currencyListItem
    } // end currencyList
}
