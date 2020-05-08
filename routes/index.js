const Router = require('express').Router();

// Controllers
const { 
    create_webinar 
} = require("../controllers/webinars");

// Webinar Routes
Router.post('/webinars', create_webinar )

module.exports = Router;