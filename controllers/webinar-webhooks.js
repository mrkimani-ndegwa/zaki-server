const {
    WEBINAR_EVENTS
} = require("../constants");

const {
    updateActionKitEvent,
    deleteEventAK
} = require("./actionkit");

const webhookListeners = (req, res) => {
    const event = req.body.event;
    switch(event){
        case WEBINAR_EVENTS.WEBINAR_UPDATED:
            console.log(event, req.body, "OTIS")
            updateActionKitEvent(req, res);
            break
        case WEBINAR_EVENTS.WEBINAR_DELETED:
            deleteEventAK(req, res);
            break;
        default:
            return false
    }
};

exports.webhookListeners = webhookListeners;