import QtQuick 2.0
import Sailfish.Silica 1.0

BackgroundItem {
    id: background
    width: parent.width
    property alias title: title.text
    property alias text: value.text
    Column {
        spacing: Theme.paddingSmall
        width: parent.width
        anchors{
            left: parent.left
            leftMargin: Theme.paddingLarge
            rightMargin: Theme.paddingLarge
        }
        anchors.centerIn: parent
        Label {
            id: title
            color: background.highlighted ? Theme.highlightColor : Theme.primaryColor
        }
        Label {
            id: value
            color: background.highlighted ? Theme.secondaryHighlightColor : Theme.secondaryColor
        }
    }
}
