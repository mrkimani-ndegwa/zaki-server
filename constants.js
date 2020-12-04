const { ZOOM_API_BASE_URL, WEBINARS_USER_ID, AFRICA_USER_ID, EUROPE_ADMIN_USER_ID,ZOOM_350_ORG_USER_ID } = require("./config");

// Tired of looking for a timezones list that is exhaustive.
// If one exists, please submit an issue and get it in here.
// for now though, I present (kinda exhaustive).
const zoomSupportedTimeZones = [
    "Pacific/Midway\nMidway Island, Samoa\n",
    "Pacific/Pago_Pago\nPago Pago\n",
    "Pacific/Honolulu\nHawaii\n",
    "America/Anchorage\nAlaska\n",
    "America/Vancouver\nVancouver\n",
    "America/Los_Angeles\nPacific Time (US and Canada)\n",
    "America/Tijuana\nTijuana\n",
    "America/Edmonton\nEdmonton\n",
    "America/Denver\nMountain Time (US and Canada)\n",
    "America/Phoenix\nArizona\n",
    "America/Mazatlan\nMazatlan\n",
    "America/Winnipeg\nWinnipeg\n",
    "America/Regina\nSaskatchewan\n",
    "America/Chicago\nCentral Time (US and Canada)\n",
    "America/Mexico_City\nMexico City\n",
    "America/Guatemala\nGuatemala\n",
    "America/El_Salvador\nEl Salvador\n",
    "America/Managua\nManagua\n",
    "America/Costa_Rica\nCosta Rica\n",
    "America/Montreal\nMontreal\n",
    "America/New_York\nEastern Time (US and Canada)\n",
    "America/Indianapolis\nIndiana (East)\n",
    "America/Panama\nPanama\n",
    "America/Bogota\nBogota\n",
    "America/Lima\nLima\n",
    "America/Halifax\nHalifax\n",
    "America/Puerto_Rico\nPuerto Rico\n",
    "America/Caracas\nCaracas\n",
    "America/Santiago\nSantiago\n",
    "America/St_Johns\nNewfoundland and Labrador\n",
    "America/Montevideo\nMontevideo\n",
    "America/Araguaina\nBrasilia\n",
    "America/Argentina/Buenos_Aires\nBuenos Aires, Georgetown\n",
    "America/Godthab\nGreenland\n",
    "America/Sao_Paulo\nSao Paulo\n",
    "Atlantic/Azores\nAzores\n",
    "Canada/Atlantic\nAtlantic Time (Canada)\n",
    "Atlantic/Cape_Verde\nCape Verde Islands\n",
    "UTC\nUniversal Time UTC\n",
    "Etc/Greenwich\nGreenwich Mean Time\n",
    "Europe/Belgrade\nBelgrade, Bratislava, Ljubljana\n",
    "CET\nSarajevo, Skopje, Zagreb\n",
    "Atlantic/Reykjavik\nReykjavik\n",
    "Europe/Dublin\nDublin\n",
    "Europe/London\nLondon\n",
    "Europe/Lisbon\nLisbon\n",
    "Africa/Casablanca\nCasablanca\n",
    "Africa/Nouakchott\nNouakchott\n",
    "Europe/Oslo\nOslo\n",
    "Europe/Copenhagen\nCopenhagen\n",
    "Europe/Brussels\nBrussels\n",
    "Europe/Berlin\nAmsterdam, Berlin, Rome, Stockholm, Vienna\n",
    "Europe/Helsinki\nHelsinki\n",
    "Europe/Amsterdam\nAmsterdam\n",
    "Europe/Rome\nRome\n",
    "Europe/Stockholm\nStockholm\n",
    "Europe/Vienna\nVienna\n",
    "Europe/Luxembourg\nLuxembourg\n",
    "Europe/Paris\nParis\n",
    "Europe/Zurich\nZurich\n",
    "Europe/Madrid\nMadrid\n",
    "Africa/Bangui\nWest Central Africa\n",
    "Africa/Algiers\nAlgiers\n",
    "Africa/Tunis\nTunis\n",
    "Africa/Harare\nHarare, Pretoria\n",
    "Africa/Nairobi\nNairobi\n",
    "Europe/Warsaw\nWarsaw\n",
    "Europe/Prague\nPrague Bratislava\n",
    "Europe/Budapest\nBudapest\n",
    "Europe/Sofia\nSofia\n",
    "Europe/Istanbul\nIstanbul\n",
    "Europe/Athens\nAthens\n",
    "Europe/Bucharest\nBucharest\n",
    "Asia/Nicosia\nNicosia\n",
    "Asia/Beirut\nBeirut\n",
    "Asia/Damascus\nDamascus\n",
    "Asia/Jerusalem\nJerusalem\n",
    "Asia/Amman\nAmman\n",
    "Africa/Tripoli\nTripoli\n",
    "Africa/Cairo\nCairo\n",
    "Africa/Johannesburg\nJohannesburg\n",
    "Europe/Moscow\nMoscow\n",
    "Asia/Baghdad\nBaghdad\n",
    "Asia/Kuwait\nKuwait\n",
    "Asia/Riyadh\nRiyadh\n",
    "Asia/Bahrain\nBahrain\n",
    "Asia/Qatar\nQatar\n",
    "Asia/Aden\nAden\n",
    "Asia/Tehran\nTehran\n",
    "Africa/Khartoum\nKhartoum\n",
    "Africa/Djibouti\nDjibouti\n",
    "Africa/Mogadishu\nMogadishu\n",
    "Asia/Dubai\nDubai\n",
    "Asia/Muscat\nMuscat\n",
    "Asia/Baku\nBaku, Tbilisi, Yerevan\n",
    "Asia/Kabul\nKabul\n",
    "Asia/Yekaterinburg\nYekaterinburg\n",
    "Asia/Tashkent\nIslamabad, Karachi, Tashkent\n",
    "Asia/Calcutta\nIndia\n",
    "Asia/Kathmandu\nKathmandu\n",
    "Asia/Novosibirsk\nNovosibirsk\n",
    "Asia/Almaty\nAlmaty\n",
    "Asia/Dacca\nDacca\n",
    "Asia/Krasnoyarsk\nKrasnoyarsk\n",
    "Asia/Dhaka\nAstana, Dhaka\n",
    "Asia/Bangkok\nBangkok\n",
    "Asia/Saigon\nVietnam\n",
    "Asia/Jakarta\nJakarta\n",
    "Asia/Irkutsk\nIrkutsk, Ulaanbaatar\n",
    "Asia/Shanghai\nBeijing, Shanghai\n",
    "Asia/Hong_Kong\nHong Kong\n",
    "Asia/Taipei\nTaipei\n",
    "Asia/Kuala_Lumpur\nKuala Lumpur\n",
    "Asia/Singapore\nSingapore\n",
    "Australia/Perth\nPerth\n",
    "Asia/Yakutsk\nYakutsk\n",
    "Asia/Seoul\nSeoul\n",
    "Asia/Tokyo\nOsaka, Sapporo, Tokyo\n",
    "Australia/Darwin\nDarwin\n",
    "Australia/Adelaide\nAdelaide\n",
    "Asia/Vladivostok\nVladivostok\n",
    "Pacific/Port_Moresby\nGuam, Port Moresby\n",
    "Australia/Brisbane\nBrisbane\n",
    "Australia/Sydney\nCanberra, Melbourne, Sydney\n",
    "Australia/Hobart\nHobart\n",
    "Asia/Magadan\nMagadan\n",
    "SST\nSolomon Islands\n",
    "Pacific/Noumea\nNew Caledonia\n",
    "Asia/Kamchatka\nKamchatka\n",
    "Pacific/Fiji\nFiji Islands, Marshall Islands\n",
    "Pacific/Auckland\nAuckland, Wellington\n",
    "Asia/Kolkata\nMumbai, Kolkata, New Delhi\n",
    "Europe/Kiev\nKiev\n",
    "America/Tegucigalpa\nTegucigalpa\n",
    "Pacific/Apia\nIndependent State of Samoa\n"
];

const supportedTimezones = zoomSupportedTimeZones.map(timezone=>{
    const [id, name] = timezone.split('\n');
    return {
        id,
        name
    }
});

// Webhook reference events
// The keys don't matter. Please don't waste your time on 'em.
const WEBINAR_EVENTS = {
    WEBINAR_UPDATED: 'webinar.updated',
    WEBINAR_CREATED:'webinar.created',
    WEBINAR_ALERT:'webinar.alert',
    WEBINAR_DELETED:'webinar.deleted',
    WEBINAR_REGISTRATION_CREATED: 'webinar.registration_created'
};

const COUNTRIES = ["Åland Islands","Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bonaire","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos [Keeling] Islands","Colombia","Comoros","Cook Islands","Costa Rica","Croatia","Cuba","Curacao","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Ivory Coast","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar [Burma]","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","North Macedonia","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn Islands","Poland","Portugal","Puerto Rico","Qatar","Republic of the Congo","Romania","Russia","Rwanda","Réunion","Saint Barthélemy","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Martin","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Sweden","Switzerland","Syria","São Tomé and Príncipe","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","U.S. Minor Outlying Islands","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"]
const validZoomAccounts = [
    'webinars@350.org',
    'zoom@350.org',
    '350africa@350.org',
    'europe-admin@350.org'
];

const isEmailPaidAccount = (email) => {
    return validZoomAccounts.includes(email.trim().replace(/\s/g, ''));
};

const returnAppropriateURLFromUserId = (email = "webinars@350.org") => {
    let finalURL = `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/`;
    if(email && isEmailPaidAccount(email)){
        switch(email){
            case validZoomAccounts[0]:
                finalURL = `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/`
                break;
            case validZoomAccounts[1]:
                finalURL = `${ZOOM_API_BASE_URL}/users/${ZOOM_350_ORG_USER_ID}/`
                break;
            case validZoomAccounts[2]:
                finalURL = `${ZOOM_API_BASE_URL}/users/${AFRICA_USER_ID}/`
                break;
            case validZoomAccounts[3]:
                finalURL = `${ZOOM_API_BASE_URL}/users/${EUROPE_ADMIN_USER_ID}/`
                break;
            default:
                return `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/`
        }
    };

    return finalURL;
};



module.exports = {
    ZOOM_WEBINAR_TYPE: 5, // Check zoom docs for more: https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate
    CREATE_WEBINARS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/webinars`,
    CREATE_MEETINGS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/meetings`,
    LIST_WEBINARS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/webinars`,
    LIST_MEETINGS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/meetings`,
    UPDATE_WEBINAR_ENDPOINT: `${ZOOM_API_BASE_URL}/webinars`,
    GET_WEBINAR_ENDPOINT: `${ZOOM_API_BASE_URL}/webinars`,
    WEBINAR_REGISTRANTS: (webinarId) => `${ZOOM_API_BASE_URL}/webinars/${webinarId}/registrants`,
    // TODO: these guys are hardcoded for now but need to be moved out
    LIST_AK_CAMPAIGN_EVENTS: `https://act.350.org/rest/v1/event/?campaign=184`,
    BASE_AK_CAMPAIGN_URL: `https://act.350.org/rest/v1/campaign/`,
    SINGLE_AK_EVENT: `https://act.350.org/rest/v1/event`,
    TIMEZONES: supportedTimezones,
    WEBINAR_EVENTS,
    COUNTRIES,
    returnAppropriateURLFromUserId
};