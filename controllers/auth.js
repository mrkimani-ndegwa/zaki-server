const { generateSignedToken } = require("../utils");


const getAccessToken = (req, res) => {
    const token = generateSignedToken();
    res.send({
        msg: "Success",
        token 
    });
}

module.exports = {
    getAccessToken
};