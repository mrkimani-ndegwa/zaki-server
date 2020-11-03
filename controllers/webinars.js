const rp = require('request-promise');
const moment = require('moment-timezone');


const { 
    CREATE_WEBINARS_ENDPOINT, 
    LIST_WEBINARS_ENDPOINT,
    LIST_AK_CAMPAIGN_EVENTS,
    BASE_AK_CAMPAIGN_URL,
    UPDATE_WEBINAR_ENDPOINT,
    GET_WEBINAR_ENDPOINT
} = require("../constants");

const {
generateRequestOptions
} = require("../utils");

const {
    AK_PASSWORD,
    AK_USERNAME
} = require("../config");


const create_webinar = async (req, res) => {
    try {
    //Store the options for Zoom API which will be used to make an API call later.
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        method: "POST",
        uri: CREATE_WEBINARS_ENDPOINT, 
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

const update_webinar_details = async (req, res) => {
    try {
    //Store the options for Zoom API which will be used to make an API call later.
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        method: "PATCH",
        uri: `${UPDATE_WEBINAR_ENDPOINT}/${req.params.webinarId}`, 
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

const list_webinars = async(req, res) => {
    try {

    const options = {
        // TODO: DRY up.
        method: "GET",
        uri: LIST_WEBINARS_ENDPOINT, 
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

const get_webinar = async(req, res) => {
    try {
    const options = {
        // TODO: DRY up.
        method: "GET",
        uri: `${GET_WEBINAR_ENDPOINT}/${req.params.webinarId}`, 
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
}

const list_webinar_campaigns_on_actionkit = async (req, res)=>{
    try {
    // Generate AUTH block
    const auth = {
        'username': AK_USERNAME,
        'password': AK_PASSWORD
    };

    console.log(req.query, "Request is here")
    const campaign = req.query.campaignId || 184;
    const eventsURL = req.query.campaignId ? `https://act.350.org/rest/v1/event/?campaign=${req.query.campaignId}` : LIST_AK_CAMPAIGN_EVENTS;

    // Get Event Details
    const campaignDetails = await rp(generateRequestOptions(
        `${BASE_AK_CAMPAIGN_URL}${campaign}`,
        auth
    ));

    const campaignEvents = await rp(generateRequestOptions(eventsURL,
    auth));
    
    const updatedCampaignEventsObjects = campaignEvents.objects.filter(campaign=>{
        const starts_at_utc = moment(campaign.starts_at_utc);
        return starts_at_utc.isAfter(moment().utc()) && campaign.status !== "deleted"
    });

    campaignEvents.objects = updatedCampaignEventsObjects

    res.send({msg: "Success", data: {
        campaignEvents,
        campaignDetails
    }});
    
    } catch(e){
        res.send({msg: "Error", data: e.message})
    }
}

module.exports = {
    create_webinar,
    list_webinars,
    get_webinar,
    list_webinar_campaigns_on_actionkit,
    update_webinar_details
}