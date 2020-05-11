const Router = require('express').Router();

// Controllers
const { 
    create_webinar,
    list_webinars
} = require("../controllers/webinars");

const {
    getAccessToken
} = require("../controllers/auth");

// utils
const {
  authenticateJWT
} = require("../utils");

// Auth Routes
Router.get('/auth', getAccessToken);

// Webinar Routes
Router.post('/webinars', authenticateJWT, create_webinar);
Router.get('/webinars', authenticateJWT, list_webinars);

module.exports = Router;