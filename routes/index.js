const Router = require('express').Router();

// Controllers
const { 
    create_webinar,
    list_webinars,
    get_webinar,
    list_webinar_campaigns_on_actionkit,
    update_webinar_details
} = require("../controllers/webinars");

const {
    create_meeting,
    list_meetings
} = require("../controllers/meetings");

const {
    webhookListeners,
} = require("../controllers/webinar-webhooks");

const {
    updateEventAk
} = require("../controllers/actionkit");

const {
    addWebinarRegistrants,
    listWebinarRegistrants
} = require("../controllers/registrants")

const {
    getAccessToken
} = require("../controllers/auth");

const {
    getTimeZonesList
} = require("../controllers/timezones");

const {
    getCountriesList
} = require("../controllers/countries");

// utils
const {
  authenticateJWT
} = require("../utils");

// Auth Routes
// No JWT here
Router.get('/auth', getAccessToken);
Router.get("/timezones", getTimeZonesList);
Router.get("/countries", getCountriesList);
// Webhook Routes
Router.post("/zaki-webhooks", webhookListeners)


// Webinar Routes
Router.post('/webinars', authenticateJWT, create_webinar);
Router.get('/webinars', authenticateJWT, list_webinars);
Router.patch('/webinars/:webinarId', authenticateJWT, update_webinar_details);
Router.get('/webinars/:webinarId', authenticateJWT, get_webinar);

// Meeting Routes
Router.post('/meetings', authenticateJWT, create_meeting);
Router.get('/meetings', authenticateJWT, list_meetings);

Router.post('/webinars/:webinarId/registrants', authenticateJWT, addWebinarRegistrants);
Router.get('/webinars/:webinarId/registrants', authenticateJWT, listWebinarRegistrants);

Router.get("/ak-webinar-campaigns", authenticateJWT, list_webinar_campaigns_on_actionkit);
Router.put("/ak-webinar-campaigns/:eventId", authenticateJWT, updateEventAk);

module.exports = Router;