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
            console.log(req.body, "are we here??")
            updateActionKitEvent(req, res);
            break
        case WEBINAR_EVENTS.WEBINAR_DELETED:
            deleteEventAK(req.body.payload, res);
            break;
        default:
            return false
    }
    
    /** 
     * SAMPLE RESPONSE FROM THIS DUDE
    {
         "event": "webinar.updated",
         "payload": {
         "account_id": "R15o7-M4RO6l3yNf2Jp0rw",
         "operator": "webinars@350.org",
         "operator_id": "6HNRlExjQcisy1iZVwl8EA",
         "object": { "id": 93280627326, "topic": "More testing nope yup" },
         "old_object": { "id": 93280627326, "topic": "More testing nope" },
         "time_stamp": 1591692737657
         }
    }
    */


};


//  { "event": "webinar.updated", "payload": { "account_id": "R15o7-M4RO6l3yNf2Jp0rw", "operator": "webinars@350.org", "operator_id": "6HNRlExjQcisy1iZVwl8EA", "object": { "id": 95133448898, "topic": "Testing Webhooks Faling to you honesty" }, "old_object": { "id": 95133448898, "topic": "Testing Webhooks" }, "time_stamp": 1592388379733 } }



exports.webhookListeners = webhookListeners;