const jwt = require('jsonwebtoken');
const { API_KEY, API_SECRET } = require("./config");

const generateSignedToken = () => {
    const payload = {
        iss: API_KEY,
        exp: ((new Date()).getTime() + 50000)
    };
    return jwt.sign(payload, API_SECRET)
};

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, API_SECRET, (err, tk) => {
            if (err) {
                return res.send({
                    msg: "Forbidden",
                    status: 403
                });
            }
            next();
        });
    } else {
        res.send({
            msg: "Unauthorized",
            status: 401
        });
    }
};

module.exports = {
    generateSignedToken,
    authenticateJWT
}