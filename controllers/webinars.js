const rp = require('request-promise');
const { generateSignedToken } = require("../utils");
const { ZOOM_WEBINAR_TYPE, CREATE_WEBINARS_ENDPOINT } = require("../constants");

const token = generateSignedToken();

const create_webinar = async (req, res) => {
    // TODO: Create Logic
    try {
    //Store the options for Zoom API which will be used to make an API call later.
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        method: "POST",
        uri: CREATE_WEBINARS_ENDPOINT, 
        auth: {
            'bearer': token
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        body: req.body,
        json: true //Parse the JSON string in the response
    };

    const response = await rp(options);
    res.send({msg: "Success", data: response})
    } catch(e){
        res.send ({ msg: `${e.message}` })
    }
};

const list_webinars = () => {
    // TODO: List Logic
    return true
};

module.exports = {
    create_webinar,
    list_webinars
}