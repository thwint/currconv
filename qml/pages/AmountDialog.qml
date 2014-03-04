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
import "../dbconfig.js" as DB

Dialog {
    canAccept:amountField.text.length>0
    DialogHeader {
        acceptText: qsTr("Accept")
    }
    property double amount
    property string currCode
    TextField {
        id: amountField
        width: 480
        y:100
        inputMethodHints: Qt.ImhFormattedNumbersOnly
        placeholderText: qsTr("Amount")
        focus: true

        validator: DoubleValidator { bottom:0.0;}
    }

    onDone: {
        if (result === DialogResult.Accepted){
            var d
            d = Number.fromLocaleString(Qt.locale(),amountField.text)
            amount = parseFloat(d)
            DB.storeSetting('amount',d)
            DB.storeSetting('fromCurr',currCode)
        }
    }
}
