const { ZOOM_API_BASE_URL, WEBINARS_USER_ID } = require("./config");

module.exports = {
    ZOOM_WEBINAR_TYPE: 5, // Check zoom docs for more: https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate
    CREATE_WEBINARS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/webinars`,
    LIST_WEBINARS_ENDPOINT: `${ZOOM_API_BASE_URL}/users/${WEBINARS_USER_ID}/webinars` 
};