const jwt = require('jsonwebtoken');
const { API_KEY, API_SECRET } = require("./config");

const generateSignedToken = () => {
    const payload = {
        iss: API_KEY,
        exp: ((new Date()).getTime() + 50000)
    };
    return jwt.sign(payload, API_SECRET)
};

module.exports = {
    generateSignedToken
}