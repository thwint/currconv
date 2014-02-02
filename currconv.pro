# The name of your app.
# NOTICE: name defined in TARGET has a corresponding QML filename.
#         If name defined in TARGET is changed, following needs to be
#         done to match new name:
#         - corresponding QML filename must be changed
#         - desktop icon filename must be changed
#         - desktop filename must be changed
#         - icon definition filename in desktop file must be changed
TARGET = currconv

CONFIG += sailfishapp

SOURCES += src/currconv.cpp

OTHER_FILES += qml/currconv.qml \
    qml/cover/CoverPage.qml \
    rpm/currconv.spec \
    rpm/currconv.yaml \
    currconv.desktop \
    qml/pages/LicensePage.qml \
    qml/pages/AboutPage.qml \
    qml/components/ValueTitleItem.qml \
    qml/dbconfig.js \
    qml/pages/MainPage.qml \
    qml/components/CurrencyItem.qml \
    qml/pages/CurrencyPage.qml \
    qml/webrequest.js \
    qml/components/CountryItem.qml \
    qml/components/CountryItem.qml \
    qml/pages/AmountDialog.qml \
    qml/dbinit.js

