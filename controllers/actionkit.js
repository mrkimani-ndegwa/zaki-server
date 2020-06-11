const rp = require('request-promise');

const { 
    LIST_AK_CAMPAIGN_EVENTS,
    BASE_AK_CAMPAIGN_URL,
    SINGLE_AK_EVENT
} = require("../constants");

const {
generateRequestOptions
} = require("../utils");


// Issue #35 Pale Github
const list_webinar_campaigns_on_actionkit = async (req, res)=>{
    try {
    // Generate AUTH block
    const auth = {
        'username': req.headers.username,
        'password': req.headers.password
    };
    // Get Event Details
    const campaignDetails = await rp(generateRequestOptions(
        `${BASE_AK_CAMPAIGN_URL}184`,
        auth
    ));

    const campaignEvents = await rp(generateRequestOptions(LIST_AK_CAMPAIGN_EVENTS,
    auth));

    res.send({msg: "Success", data: {
        campaignEvents,
        campaignDetails
    }});
    
    } catch(e){
        res.send({msg: "Error", data: e.message})
    }
};

// From webhook
const updateActionKitEvent = async(req, res)=> {
    try {
    // Generate AUTH block
    const auth = {
        'username': req.headers.username,
        'password': req.headers.password
    };

    // Get all events from ak. This could be simpler if we had our own db but TODO:
    const campaignEvents = await rp(generateRequestOptions(LIST_AK_CAMPAIGN_EVENTS,
    auth));
    // Grab Zoom ID from  webhook
    // We only pass payload to this guy.
    console.log("Got here", req.body.payload)
    const zoomId = req.body.payload.object.id;
    const zoomURL = `https://350org.zoom.us/j/${zoomId}`;
    // Get correct actionkit event that corresponds
    const [event] = campaignEvents.objects.filter(event=>{
        console.log(event.address1, "here")
        const [link,] = event.address1.split(",");
        const [, zoomLink] = link.split(" ") 
        return zoomLink === zoomURL
    });

    if(!event){
        throw new Error("No such event found.")
    };
    // If we are here now we can proceed to PUT the AK Event
    const payload = req.body.payload.object;
    const id = event.id; // Correct AK Event ID.
    /*
              topic,
                  type: 5, // Zoom Docs req.
                  start_time: zoomStartTime,
                  duration,
                  timezone: timezonesList.filter(t=>t.name === timezone)[0].id,
                  password: generateZoomWebinarPassword(4),
                  agenda
    */
   // I am so sorry to myself for having to do this.
   const oldEvent = await rp({
       method: "GET",
       uri: `${SINGLE_AK_EVENT}/${id}/`,
       auth,
       json: true
   });


    const updatePayload = {
        title: payload.topic
    }
    const options = {
        uri: `${SINGLE_AK_EVENT}/${id}/`,
        method: "PUT",
        body: updatePayload,
        auth,
        json: true
    };

    const response = await rp(options);
    res.send({data: response || "Success"})

    } catch(e){
        res.send({msg: "Error", data: e && e.message || "Unknown Error Occured"})
    }
};

const deleteEventAK = () => {
    // TODO
};

const updateEventAk = (req, res) => {
    try {

        // Generate AUTH block
        const auth = {
            'username': req.headers.username,
            'password': req.headers.password
        };
        const response = rp({
            method: "PUT"
        })
        res.send({msg: "got here", data: req.params.eventId})
        } catch(e){
            res.send({msg: "Error", data: e.message})
        }
};

module.exports = {
    list_webinar_campaigns_on_actionkit,
    updateActionKitEvent,
    deleteEventAK,
    updateEventAk
}