const countriesOptions = [
    {
        "n": "Afghanistan",
        "c": "AFG"
    },
    {
        "n": "Aland",
        "c": "ALA"
    },
    {
        "n": "Albania",
        "c": "ALB"
    },
    {
        "n": "Algeria",
        "c": "DZA"
    },
    {
        "n": "American Samoa",
        "c": "ASM"
    },
    {
        "n": "Andorra",
        "c": "AND"
    },
    {
        "n": "Angola",
        "c": "AGO"
    },
    {
        "n": "Anguilla",
        "c": "AIA"
    },
    {
        "n": "Antigua and Barb.",
        "c": "ATG"
    },
    {
        "n": "Argentina",
        "c": "ARG"
    },
    {
        "n": "Armenia",
        "c": "ARM"
    },
    {
        "n": "Aruba",
        "c": "ABW"
    },
    {
        "n": "Australia",
        "c": "AUS"
    },
    {
        "n": "Austria",
        "c": "AUT"
    },
    {
        "n": "Azerbaijan",
        "c": "AZE"
    },
    {
        "n": "Bahamas",
        "c": "BHS"
    },
    {
        "n": "Bahrain",
        "c": "BHR"
    },
    {
        "n": "Bangladesh",
        "c": "BGD"
    },
    {
        "n": "Barbados",
        "c": "BRB"
    },
    {
        "n": "Belarus",
        "c": "BLR"
    },
    {
        "n": "Belgium",
        "c": "BEL"
    },
    {
        "n": "Belize",
        "c": "BLZ"
    },
    {
        "n": "Benin",
        "c": "BEN"
    },
    {
        "n": "Bermuda",
        "c": "BMU"
    },
    {
        "n": "Bhutan",
        "c": "BTN"
    },
    {
        "n": "Bolivia",
        "c": "BOL"
    },
    {
        "n": "Bosnia and Herz.",
        "c": "BIH"
    },
    {
        "n": "Botswana",
        "c": "BWA"
    },
    {
        "n": "Brazil",
        "c": "BRA"
    },
    {
        "n": "British Virgin Is.",
        "c": "VGB"
    },
    {
        "n": "Brunei",
        "c": "BRN"
    },
    {
        "n": "Bulgaria",
        "c": "BGR"
    },
    {
        "n": "Burkina Faso",
        "c": "BFA"
    },
    {
        "n": "Burundi",
        "c": "BDI"
    },
    {
        "n": "Cambodia",
        "c": "KHM"
    },
    {
        "n": "Cameroon",
        "c": "CMR"
    },
    {
        "n": "Canada",
        "c": "CAN"
    },
    {
        "n": "Cape Verde",
        "c": "CPV"
    },
    {
        "n": "Cayman Is.",
        "c": "CYM"
    },
    {
        "n": "Central African Rep.",
        "c": "CAF"
    },
    {
        "n": "Chad",
        "c": "TCD"
    },
    {
        "n": "Chile",
        "c": "CHL"
    },
    {
        "n": "China",
        "c": "CHN"
    },
    {
        "n": "Colombia",
        "c": "COL"
    },
    {
        "n": "Comoros",
        "c": "COM"
    },
    {
        "n": "Congo",
        "c": "COG"
    },
    {
        "n": "Cook Is.",
        "c": "COK"
    },
    {
        "n": "Costa Rica",
        "c": "CRI"
    },
    {
        "n": "Croatia",
        "c": "HRV"
    },
    {
        "n": "Cuba",
        "c": "CUB"
    },
    {
        "n": "Curaçao",
        "c": "CUW"
    },
    {
        "n": "Cyprus",
        "c": "CYP"
    },
    {
        "n": "Czech Rep.",
        "c": "CZE"
    },
    {
        "n": "Côte d'Ivoire",
        "c": "CIV"
    },
    {
        "n": "Dem. Rep. Congo",
        "c": "COD"
    },
    {
        "n": "Dem. Rep. Korea",
        "c": "PRK"
    },
    {
        "n": "Denmark",
        "c": "DNK"
    },
    {
        "n": "Djibouti",
        "c": "DJI"
    },
    {
        "n": "Dominica",
        "c": "DMA"
    },
    {
        "n": "Dominican Rep.",
        "c": "DOM"
    },
    {
        "n": "Ecuador",
        "c": "ECU"
    },
    {
        "n": "Egypt",
        "c": "EGY"
    },
    {
        "n": "El Salvador",
        "c": "SLV"
    },
    {
        "n": "Eq. Guinea",
        "c": "GNQ"
    },
    {
        "n": "Eritrea",
        "c": "ERI"
    },
    {
        "n": "Estonia",
        "c": "EST"
    },
    {
        "n": "Ethiopia",
        "c": "ETH"
    },
    {
        "n": "Faeroe Is.",
        "c": "FRO"
    },
    {
        "n": "Falkland Is.",
        "c": "FLK"
    },
    {
        "n": "Fiji",
        "c": "FJI"
    },
    {
        "n": "Finland",
        "c": "FIN"
    },
    {
        "n": "Fr. Polynesia",
        "c": "PYF"
    },
    {
        "n": "France",
        "c": "FRA"
    },
    {
        "n": "Gabon",
        "c": "GAB"
    },
    {
        "n": "Gambia",
        "c": "GMB"
    },
    {
        "n": "Georgia",
        "c": "GEO"
    },
    {
        "n": "Germany",
        "c": "DEU"
    },
    {
        "n": "Ghana",
        "c": "GHA"
    },
    {
        "n": "Greece",
        "c": "GRC"
    },
    {
        "n": "Greenland",
        "c": "GRL"
    },
    {
        "n": "Grenada",
        "c": "GRD"
    },
    {
        "n": "Guam",
        "c": "GUM"
    },
    {
        "n": "Guatemala",
        "c": "GTM"
    },
    {
        "n": "Guernsey",
        "c": "GGY"
    },
    {
        "n": "Guinea",
        "c": "GIN"
    },
    {
        "n": "Guinea-Bissau",
        "c": "GNB"
    },
    {
        "n": "Guyana",
        "c": "GUY"
    },
    {
        "n": "Haiti",
        "c": "HTI"
    },
    {
        "n": "Honduras",
        "c": "HND"
    },
    {
        "n": "Hong Kong",
        "c": "HKG"
    },
    {
        "n": "Hungary",
        "c": "HUN"
    },
    {
        "n": "Iceland",
        "c": "ISL"
    },
    {
        "n": "India",
        "c": "IND"
    },
    {
        "n": "Indonesia",
        "c": "IDN"
    },
    {
        "n": "Iran",
        "c": "IRN"
    },
    {
        "n": "Iraq",
        "c": "IRQ"
    },
    {
        "n": "Ireland",
        "c": "IRL"
    },
    {
        "n": "Isle of Man",
        "c": "IMN"
    },
    {
        "n": "Israel",
        "c": "ISR"
    },
    {
        "n": "Italy",
        "c": "ITA"
    },
    {
        "n": "Jamaica",
        "c": "JAM"
    },
    {
        "n": "Japan",
        "c": "JPN"
    },
    {
        "n": "Jersey",
        "c": "JEY"
    },
    {
        "n": "Jordan",
        "c": "JOR"
    },
    {
        "n": "Kazakhstan",
        "c": "KAZ"
    },
    {
        "n": "Kenya",
        "c": "KEN"
    },
    {
        "n": "Kiribati",
        "c": "KIR"
    },
    {
        "n": "Korea",
        "c": "KOR"
    },
    {
        "n": "Kuwait",
        "c": "KWT"
    },
    {
        "n": "Kyrgyzstan",
        "c": "KGZ"
    },
    {
        "n": "Lao PDR",
        "c": "LAO"
    },
    {
        "n": "Latvia",
        "c": "LVA"
    },
    {
        "n": "Lebanon",
        "c": "LBN"
    },
    {
        "n": "Lesotho",
        "c": "LSO"
    },
    {
        "n": "Liberia",
        "c": "LBR"
    },
    {
        "n": "Libya",
        "c": "LBY"
    },
    {
        "n": "Liechtenstein",
        "c": "LIE"
    },
    {
        "n": "Lithuania",
        "c": "LTU"
    },
    {
        "n": "Luxembourg",
        "c": "LUX"
    },
    {
        "n": "Macao",
        "c": "MAC"
    },
    {
        "n": "Macedonia",
        "c": "MKD"
    },
    {
        "n": "Madagascar",
        "c": "MDG"
    },
    {
        "n": "Malawi",
        "c": "MWI"
    },
    {
        "n": "Malaysia",
        "c": "MYS"
    },
    {
        "n": "Mali",
        "c": "MLI"
    },
    {
        "n": "Malta",
        "c": "MLT"
    },
    {
        "n": "Marshall Is.",
        "c": "MHL"
    },
    {
        "n": "Mauritania",
        "c": "MRT"
    },
    {
        "n": "Mexico",
        "c": "MEX"
    },
    {
        "n": "Micronesia",
        "c": "FSM"
    },
    {
        "n": "Moldova",
        "c": "MDA"
    },
    {
        "n": "Monaco",
        "c": "MCO"
    },
    {
        "n": "Mongolia",
        "c": "MNG"
    },
    {
        "n": "Montenegro",
        "c": "MNE"
    },
    {
        "n": "Montserrat",
        "c": "MSR"
    },
    {
        "n": "Morocco",
        "c": "MAR"
    },
    {
        "n": "Mozambique",
        "c": "MOZ"
    },
    {
        "n": "Myanmar",
        "c": "MMR"
    },
    {
        "n": "N. Mariana Is.",
        "c": "MNP"
    },
    {
        "n": "Namibia",
        "c": "NAM"
    },
    {
        "n": "Nauru",
        "c": "NRU"
    },
    {
        "n": "Nepal",
        "c": "NPL"
    },
    {
        "n": "Netherlands",
        "c": "NLD"
    },
    {
        "n": "New Caledonia",
        "c": "NCL"
    },
    {
        "n": "New Zealand",
        "c": "NZL"
    },
    {
        "n": "Nicaragua",
        "c": "NIC"
    },
    {
        "n": "Niger",
        "c": "NER"
    },
    {
        "n": "Nigeria",
        "c": "NGA"
    },
    {
        "n": "Niue",
        "c": "NIU"
    },
    {
        "n": "Norfolk Island",
        "c": "NFK"
    },
    {
        "n": "Norway",
        "c": "NOR"
    },
    {
        "n": "Oman",
        "c": "OMN"
    },
    {
        "n": "Pakistan",
        "c": "PAK"
    },
    {
        "n": "Palau",
        "c": "PLW"
    },
    {
        "n": "Palestine",
        "c": "PSE"
    },
    {
        "n": "Panama",
        "c": "PAN"
    },
    {
        "n": "Papua New Guinea",
        "c": "PNG"
    },
    {
        "n": "Paraguay",
        "c": "PRY"
    },
    {
        "n": "Peru",
        "c": "PER"
    },
    {
        "n": "Philippines",
        "c": "PHL"
    },
    {
        "n": "Pitcairn Is.",
        "c": "PCN"
    },
    {
        "n": "Poland",
        "c": "POL"
    },
    {
        "n": "Portugal",
        "c": "PRT"
    },
    {
        "n": "Puerto Rico",
        "c": "PRI"
    },
    {
        "n": "Qatar",
        "c": "QAT"
    },
    {
        "n": "Romania",
        "c": "ROU"
    },
    {
        "n": "Russia",
        "c": "RUS"
    },
    {
        "n": "Rwanda",
        "c": "RWA"
    },
    {
        "n": "S. Sudan",
        "c": "SSD"
    },
    {
        "n": "Saint Lucia",
        "c": "LCA"
    },
    {
        "n": "Samoa",
        "c": "WSM"
    },
    {
        "n": "San Marino",
        "c": "SMR"
    },
    {
        "n": "Saudi Arabia",
        "c": "SAU"
    },
    {
        "n": "Senegal",
        "c": "SEN"
    },
    {
        "n": "Serbia",
        "c": "SRB"
    },
    {
        "n": "Sierra Leone",
        "c": "SLE"
    },
    {
        "n": "Singapore",
        "c": "SGP"
    },
    {
        "n": "Sint Maarten",
        "c": "SXM"
    },
    {
        "n": "Slovakia",
        "c": "SVK"
    },
    {
        "n": "Slovenia",
        "c": "SVN"
    },
    {
        "n": "Solomon Is.",
        "c": "SLB"
    },
    {
        "n": "Somalia",
        "c": "SOM"
    },
    {
        "n": "South Africa",
        "c": "ZAF"
    },
    {
        "n": "Spain",
        "c": "ESP"
    },
    {
        "n": "Sri Lanka",
        "c": "LKA"
    },
    {
        "n": "St-Barthélemy",
        "c": "BLM"
    },
    {
        "n": "St-Martin",
        "c": "MAF"
    },
    {
        "n": "St. Kitts and Nevis",
        "c": "KNA"
    },
    {
        "n": "St. Pierre and Miquelon",
        "c": "SPM"
    },
    {
        "n": "St. Vin. and Gren.",
        "c": "VCT"
    },
    {
        "n": "Sudan",
        "c": "SDN"
    },
    {
        "n": "Suriname",
        "c": "SUR"
    },
    {
        "n": "Swaziland",
        "c": "SWZ"
    },
    {
        "n": "Sweden",
        "c": "SWE"
    },
    {
        "n": "Switzerland",
        "c": "CHE"
    },
    {
        "n": "Syria",
        "c": "SYR"
    },
    {
        "n": "São Tomé and Principe",
        "c": "STP"
    },
    {
        "n": "Taiwan",
        "c": "TWN"
    },
    {
        "n": "Tajikistan",
        "c": "TJK"
    },
    {
        "n": "Tanzania",
        "c": "TZA"
    },
    {
        "n": "Thailand",
        "c": "THA"
    },
    {
        "n": "Timor-Leste",
        "c": "TLS"
    },
    {
        "n": "Togo",
        "c": "TGO"
    },
    {
        "n": "Tonga",
        "c": "TON"
    },
    {
        "n": "Trinidad and Tobago",
        "c": "TTO"
    },
    {
        "n": "Tunisia",
        "c": "TUN"
    },
    {
        "n": "Turkey",
        "c": "TUR"
    },
    {
        "n": "Turkmenistan",
        "c": "TKM"
    },
    {
        "n": "Turks and Caicos Is.",
        "c": "TCA"
    },
    {
        "n": "U.S. Virgin Is.",
        "c": "VIR"
    },
    {
        "n": "Uganda",
        "c": "UGA"
    },
    {
        "n": "Ukraine",
        "c": "UKR"
    },
    {
        "n": "United Arab Emirates",
        "c": "ARE"
    },
    {
        "n": "United Kingdom",
        "c": "GBR"
    },
    {
        "n": "United States",
        "c": "USA"
    },
    {
        "n": "Uruguay",
        "c": "URY"
    },
    {
        "n": "Uzbekistan",
        "c": "UZB"
    },
    {
        "n": "Vanuatu",
        "c": "VUT"
    },
    {
        "n": "Vatican",
        "c": "VAT"
    },
    {
        "n": "Venezuela",
        "c": "VEN"
    },
    {
        "n": "Vietnam",
        "c": "VNM"
    },
    {
        "n": "W. Sahara",
        "c": "ESH"
    },
    {
        "n": "Wallis and Futuna Is.",
        "c": "WLF"
    },
    {
        "n": "Yemen",
        "c": "YEM"
    },
    {
        "n": "Zambia",
        "c": "ZMB"
    },
    {
        "n": "Zimbabwe",
        "c": "ZWE"
    }
]

export default countriesOptions;