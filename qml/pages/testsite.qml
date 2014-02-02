import QtQuick 2.0

GridView {
    id: mainGrid
    cellWidth: 165; cellHeight: 95
    width: 5*cellWidth; height: 4*cellHeight
    model: myModel
    delegate: myButton

    ListModel {
        id: myModel
        function createModel() {
            for (var i=1; i<=20; i++) {
                myModel.append({"display": i, "uid": i})
            }
        }
        Component.onCompleted: {createModel()}
    }

    Component {
        id: myButton
        Item {
            id: item
            width: mainGrid.cellWidth-5; height: mainGrid.cellHeight-5;
            Rectangle {
                id: box
                parent: mainGrid
                x: item.x; y: item.y;
                width: item.width; height: item.height;
                border.width: 1
                property int uid: (index >= 0) ? myModel.get(index).uid : -1
                Text {
                    anchors.centerIn: parent
                    text: display
                    font.pixelSize: 48
                }
                states: [
                    State {
                        name: "active"; when: gridArea.activeId == box.uid
                        PropertyChanges {target: box; x: gridArea.mouseX-80; y: gridArea.mouseY-45; z: 10}
                    }
                ]
            }
        }
    }

    MouseArea {
        id: gridArea
        anchors.fill: parent
        hoverEnabled: true
        preventStealing : true
        property int index: mainGrid.indexAt(mouseX, mouseY) //item underneath cursor
        property int activeId: -1 //uid of active item
        property int activeIndex //current position of active item

        onPressAndHold: {
            activeId = mainGrid.model.get(activeIndex=index).uid
        }
        onReleased: {
            activeId = -1
        }
        onPositionChanged: {
            if (activeId != -1 && index != -1 && index != activeIndex) {
                mainGrid.model.move(activeIndex, activeIndex = index, 1)
            }
        }
    }
}
