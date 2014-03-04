# The name of your app.
# NOTICE: name defined in TARGET has a corresponding QML filename.
#         If name defined in TARGET is changed, following needs to be
#         done to match new name:
#         - corresponding QML filename must be changed
#         - desktop icon filename must be changed
#         - desktop filename must be changed
#         - icon definition filename in desktop file must be changed
TARGET = harbour-currencycalculator

CONFIG += sailfishapp

SOURCES += src/harbour-currencycalculator.cpp

lupdate_only{
SOURCES = *.qml \
          *.js \
          qml/*.qml \
          qml/pages/*.qml \
          qml/components/*.qml \
          qml/cover/*.qml \
          qml/*.js
}

TRANSLATIONS = translations/en.ts \
               translations/de_DE.ts \
               translations/de_CH.ts

i18n.files = $$replace(TRANSLATIONS, .ts, .qm)
i18n.path = /usr/share/$$TARGET/translations

INSTALLS += i18n

OTHER_FILES += qml/harbour-currencycalculator.qml \
    qml/cover/CoverPage.qml \
    rpm/harbour-currencycalculator.spec \
    rpm/harbour-currencycalculator.yaml \
    harbour-currencycalculator.desktop \
    qml/pages/MainPage.qml \
    qml/pages/LicensePage.qml \
    qml/pages/CurrencyPage.qml \
    qml/pages/AmountDialog.qml \
    qml/pages/AboutPage.qml \
    qml/webrequest.js \
    qml/dbinit.js \
    qml/dbconfig.js \
    qml/components/ValueTitleItem.qml \
    qml/components/CurrencyItem.qml \
    qml/components/CountryItem.qml \
    qml/components/NotifyBanner.qml \
    qml/components/CoverItem.qml \
    translations/en.ts \
    translations/de.ts \
    translations/de_DE.ts \
    translations/de_CH.ts

