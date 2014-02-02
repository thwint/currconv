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
.import "dbconfig.js" as DB

/******************************************************************************
 * At the start of the application, we can initialize the tables we need if
 * they haven't been created yet
 *****************************************************************************/
function initialize() {
    var db = DB.getDatabase();
    db.transaction(
                function(tx) {
//                    tx.executeSql('DROP TABLE currencies');
//                    tx.executeSql('DROP TABLE settings');
//                    tx.executeSql('DROP TABLE rates');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS currencies (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,country TEXT,currency TEXT,code TEXT,symbol TEXT,available INTEGER,position INTEGER)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS rates (symbol TEXT PRIMARY KEY UNIQUE, rate REAL)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY UNIQUE, value TEXT)');
                    var rs  = tx.executeSql("SELECT * FROM currencies");
                    if (rs.rows.length === 0) {
                        console.log("Currencies table empty - Initializing currencies");
                        initCurrencies();
                    }
                });
}

/******************************************************************************
 * Initialize the currencies table with all available currencies
 * TODO:
 * - where appropriate: merge currencies together
 *****************************************************************************/
function initCurrencies() {
    var db = DB.getDatabase();
    db.transaction(
                function(tx) {
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Afghanistan","Afghan afghani","AFN",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Albania","Albanian lek","ALL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Algeria","Algerian dinar","DZD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Angola","Angolan kwanza","AOA",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Anguilla","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Antigua and Barbuda","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Argentina","Argentine peso","ARS",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Armenia","Armenian dram","AMD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Aruba","Aruban florin","AWG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Australia","Australian dollar","AUD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Austria","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Azerbaijan","Azerbaijani manat","AZN",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bahamas","Bahamian dollar","BSD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bahrain","Bahraini dinar","BHD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bangladesh","Bangladeshi taka","BDT",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Barbados","Barbadian dollar","BBD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Belarus","Belarusian ruble","BYR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Belgium","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Belize","Belize dollar","BZD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Benin","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bhutan","Bhutanese ngultrum","BTN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bolivia","Bolivian boliviano","BOB",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bosnia-Herzegovina","Bosnia and Herzegovina konvertibilna marka","BAM",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Botswana","Botswana pula","BWP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Brazil","Brazilian real","BRL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Brunei","Brunei dollar","BND",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Bulgaria","Bulgarian lev","BGN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Burkina Faso","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Burundi","Burundi franc","BIF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cambodia","Cambodian riel","KHR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cameroon","Central African CFA franc","XAF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Canada","Canadian dollar","CAD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cape Verde","Cape Verdean escudo","CVE",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cayman Islands","Cayman Islands dollar","KYD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Central African Republic","Central African CFA franc","XAF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Chad","Central African CFA franc","XAF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Chile","Chilean peso","CLP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["China","Chinese renminbi","CNY",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Colombia","Colombian peso","COP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Comoros","Comorian franc","KMF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Congo","Central African CFA franc","XAF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Congo, Democratic Republic","Congolese franc","CDF",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Costa Rica","Costa Rican colon","CRC",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Côte d'Ivoire","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Croatia","Croatian kuna","HRK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cuba","Cuban peso","CUC",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Cyprus","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Czech Republic","Czech koruna","CZK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Denmark","Danish krone","DKK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Djibouti","Djiboutian franc","DJF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Dominica","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Dominican Republic","Dominican peso","DOP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["East Timor","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Ecuador","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Egypt","Egyptian pound","EGP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["El Salvador","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Equatorial Guinea","Central African CFA franc","GQE",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Eritrea","Eritrean nakfa","ERN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Estonia","Estonian kroon","EEK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Ethiopia","Ethiopian birr","ETB",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["European Union","Euro","EUR",null,1,2]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Falkland Islands","Falkland Islands pound","FKP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Fiji","Fijian dollar","FJD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Finland","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["France","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["French Polynesia","CFP franc","XPF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Gabon","Central African CFA franc","XAF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Gambia","Gambian dalasi","GMD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Georgia","Georgian lari","GEL",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Germany","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Ghana","Ghanaian cedi","GHS",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Gibraltar","Gibraltar pound","GIP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Greece","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Grenada","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Guatemala","Guatemalan quetzal","GTQ",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Guinea","Guinean franc","GNF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Guinea-Bissau","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Guyana","Guyanese dollar","GYD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Haiti","Haitian gourde","HTG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Honduras","Honduran lempira","HNL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Hong Kong","Hong Kong dollar","HKD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Hungary","Hungarian forint","HUF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Iceland","Icelandic króna","ISK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["India","Indian rupee","INR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Indonesia","Indonesian rupiah","IDR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["International Monetary Fund","Special Drawing Rights","XDR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Iran","Iranian rial","IRR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Iraq","Iraqi dinar","IQD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Ireland","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Israel","Israeli new sheqel","ILS",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Italy","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Jamaica","Jamaican dollar","JMD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Japan","Japanese yen","JPY",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Jordan","Jordanian dinar","JOD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Kazakhstan","Kazakhstani tenge","KZT",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Kenya","Kenyan shilling","KES",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Kiribati","Australian dollar","AUD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["North Korea","North Korean won","KPW",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["South Korea","South Korean won","KRW",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Kuwait","Kuwaiti dinar","KWD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Kyrgyzstan","Kyrgyzstani som","KGS",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Laos","Lao kip","LAK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Latvia","Latvian lats","LVL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Lebanon","Lebanese lira","LBP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Lesotho","Lesotho loti","LSL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Liberia","Liberian dollar","LRD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Libya","Libyan dinar","LYD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Liechtenstein","uses the Swiss Franc","CHF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Lithuania","Lithuanian litas","LTL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Luxembourg","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Macao","Macanese pataca","MOP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Macedonia","Macedonian denar","MKD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Madagascar","Malagasy ariary","MGA",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Malawi","Malawian kwacha","MWK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Malaysia","Malaysian ringgit","MYR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Maldives","Maldivian rufiyaa","MVR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mali","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Malta","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mauritania","Mauritanian ouguiya","MRO",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mauritius","Mauritian rupee","MUR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mexico","Mexican peso","MXN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Micronesia","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Moldova","Moldovan leu","MDL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Monaco","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mongolia","Mongolian tugrik","MNT",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Montenegro","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Montserrat","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Morocco","Moroccan dirham","MAD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Mozambique","Mozambican metical","MZM",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Myanmar","Myanma kyat","MMK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Namibia","Namibian dollar","NAD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Nauru","Australian dollar","AUD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Nepal","Nepalese rupee","NPR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Netherlands","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Netherlands Antilles","Netherlands Antillean gulden","ANG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["New Caledonia","CFP franc","XPF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["New Zealand","New Zealand dollar","NZD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Nicaragua","Nicaraguan cordoba","NIO",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Niger","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Nigeria","Nigerian naira","NGN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Norway","Norwegian krone","NOK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Oman","Omani rial","OMR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Pakistan","Pakistani rupee","PKR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Palau","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Panama","Panamanian balboa","PAB",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Panama Canal Zone","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Papua New Guinea","Papua New Guinean kina","PGK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Paraguay","Paraguayan guarani","PYG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Peru","Peruvian nuevo sol","PEN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Philippines","Philippine peso","PHP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Poland","Polish zloty","PLN",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Portugal","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Puerto Rico","US dollar","USD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Qatar","Qatari riyal","QAR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Romania","Romanian leu","RON",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Russian_Federation","Russian ruble","RUB",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Rwanda","Rwandan franc","RWF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Saint Helena","Saint Helena pound","SHP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Saint Kitts and Nevis","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Saint Lucia","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Saint Vincent and the Grenadines","East Caribbean dollar","XCD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Samoa (Western)","Samoan tala","WST",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["San Marino","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Sao Tome and Principe","Sao Tome and Principe dobra","STD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Saudi Arabia","Saudi riyal","SAR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Senegal","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Serbia","Serbian dinar","RSD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Seychelles","Seychellois rupee","SCR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Sierra Leone","Sierra Leonean leone","SLL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Singapore","Singapore dollar","SGD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Slovakia","Slovak koruna","SKK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Slovenia","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Solomon Islands","Solomon Islands dollar","SBD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Somalia","Somali shilling","SOS",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["South Africa","South African rand","ZAR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["South Sudan","Sudanese pound","SDG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Spain","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Sri Lanka","Sri Lankan rupee","LKR",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Sudan","Sudanese pound","SDG",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Suriname","Surinamese dollar","SRD",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Swaziland","Swazi lilangeni","SZL",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Sweden","Swedish krona","SEK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Switzerland","Swiss franc","CHF",null,1,1]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Syria","Syrian pound","SYP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Taiwan","New Taiwan dollar","TWD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Tajikistan","Tajikistani somoni","TJS",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Tanzania","Tanzanian shilling","TZS",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Thailand","Thai baht","THB",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Togo","West African CFA franc","XOF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Tonga","Paanga","TOP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Trinidad and Tobago","Trinidad and Tobago dollar","TTD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Tunisia","Tunisian dinar","TND",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Turkey","Turkish new lira","TRY",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Turkmenistan","Turkmen manat","TMM",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Tuvalu","Australian dollar","AUD",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Uganda","Ugandan shilling","UGX",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Ukraine","Ukrainian hryvnia","UAH",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["United Arab Emirates","UAE dirham","AED",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["United Kingdom","British pound","GBP",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["United States of America","US dollar","USD",null,1,3]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Uruguay","Uruguayan peso","UYU",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Uzbekistan","Uzbekistani som","UZS",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Vanuatu","Vanuatu vatu","VUV",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Vatican","Euro","EUR",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Venezuela","Venezuelan bolivar","VEB",null,0,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Vietnam","Vietnamese dong","VND",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Wallis and Futuna Islands","CFP franc","XPF",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Yemen","Yemeni rial","YER",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Zambia","Zambian kwacha","ZMK",null,1,null]);
                    tx.executeSql('INSERT INTO currencies (country,currency,code,symbol,available,position) VALUES(?,?,?,?,?,?)',["Zimbabwe","Zimbabwean dollar","ZWD",null,1,null]);
                });
}
