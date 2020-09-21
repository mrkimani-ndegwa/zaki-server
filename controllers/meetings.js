const rp = require('request-promise');

const { 
    CREATE_MEETINGS_ENDPOINT, 
    LIST_MEETINGS_ENDPOINT
} = require("../constants");

const create_meeting = async (req, res) => {
    try {
    //Store the options for Zoom API which will be used to make an API call later.
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        method: "POST",
        uri: CREATE_MEETINGS_ENDPOINT, 
        auth: {
            'bearer': req.headers.authorization
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

const list_meetings = async(req, res) => {
    try {

    const options = {
        // TODO: DRY up.
        method: "GET",
        uri: LIST_MEETINGS_ENDPOINT, 
        auth: {
            'bearer': req.headers.authorization
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

    const response = await rp(options);
    res.send({msg: "Success", data: response})

    } catch(e){
        res.send ({ msg: `${e.message}` }) 
    } 
};

module.exports = {
    create_meeting,
    list_meetings
}