const Router = require('express').Router();

// Controllers
const { 
    create_webinar,
    list_webinars
} = require("../controllers/webinars");

const {
    getAccessToken
} = require("../controllers/auth");

const {
    getTimeZonesList
} = require("../controllers/timezones");

// utils
const {
  authenticateJWT
} = require("../utils");

// Auth Routes
// No JWT here
Router.get('/auth', getAccessToken);
Router.get("/timezones", getTimeZonesList);


// Webinar Routes
Router.post('/webinars', authenticateJWT, create_webinar);
Router.get('/webinars', authenticateJWT, list_webinars);

module.exports = Router;