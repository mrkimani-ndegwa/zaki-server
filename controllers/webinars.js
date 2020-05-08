const rp = require('request-promise');
const { generateSignedToken } = require("../utils");
const { ZOOM_WEBINAR_TYPE, CREATE_WEBINARS_ENDPOINT } = require("../constants");

const token = generateSignedToken();

const create_webinar = async (req, res) => {
    // TODO: Create Logic
    try {

    // TODO: Use AJV for validation here. This could get messy.
    // Test data for now but should be retrieved from the req.body
    // This currently works lol!
    const payLoad = {
        "topic": "ZAKI Test Webinar 2",
        "type": ZOOM_WEBINAR_TYPE,
        "start_time": "2020-09-20T06:59:00Z",
        "duration": "60",
        "timezone": "America/Los_Angeles",
        "password": "pass123",
        "agenda": "Zaki Testing API Format 2"
    };
    console.log(req.body, "here")
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
        body: payLoad,
        json: true //Parse the JSON string in the response
    };

    const response = await rp(options);
    res.send({msg: "Success", data: response})

    // throw new Error("Response not ok.")
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