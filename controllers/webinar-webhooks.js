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
            updateActionKitEvent(req, res);
            break
        case WEBINAR_EVENTS.WEBINAR_DELETED:
            deleteEventAK(req.body.payload, res);
            break;
        default:
            return false
    }



};

exports.webhookListeners = webhookListeners;