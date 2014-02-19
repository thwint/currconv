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

BackgroundItem {
    id: background
    width: parent.width
    property int currID
    property alias currCode: currCode.text
    property alias currName: currName.text
    property string countryName: country //countryName.text
    property alias symbol: symbol.text
    property alias currAmount: amount.text

    function replaceSpace(country){
        country = country.replace(/ /g, '_');
        return country;
    }

    function enableButtons(){
        upButton.visible=true;
        downButton.visible=true;
        doneButton.visible=true;
    }
    function disableButtons(){
        upButton.visible=false;
        downButton.visible=false;
        doneButton.visible=false;
    }

    anchors{
        left: parent.left
    }
    Item{
        id: countryFlag
        height:60
        width: 80
        Image {
            fillMode: Image.PreserveAspectCrop
            source: "../images/"+replaceSpace(country)+".png"
            anchors.leftMargin: Theme.paddingSmall
        }}
    Label {
        id: currName
        color: background.highlighted ? Theme.highlightColor : Theme.primaryColor
        font.pixelSize: Theme.fontSizeExtraSmall
        anchors{
            left: countryFlag.right
            top: countryFlag.top
            leftMargin: Theme.paddingSmall
        }
    }
    Label {
        id: currCode
        color: background.highlighted ? Theme.highlightColor : Theme.primaryColor
        font.pixelSize: Theme.fontSizeExtraSmall
        anchors{
            left: countryFlag.right
            bottom: countryFlag.bottom
            leftMargin: Theme.paddingSmall
        }
    }
    Label {
        id: symbol
        color: background.highlighted ? Theme.secondaryHighlightColor : Theme.secondaryColor
        font.pixelSize: Theme.fontSizeExtraSmall
        anchors{
            left: currName.right
            bottom: countryFlag.bottom
        }
    }
    Label {
        id: amount
        color: background.highlighted ? Theme.secondaryHighlightColor : Theme.secondaryColor
        font.pixelSize: Theme.fontSizeExtraSmall
        anchors{
            left: currCode.right
            bottom: countryFlag.bottom
            leftMargin: Theme.paddingSmall
        }
    }
}
