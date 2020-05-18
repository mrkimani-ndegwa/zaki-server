const {TIMEZONES} = require("../constants");

const getTimeZonesList = (req, res) => {
    res.send({
        msg: "Success", // as if it will be anything else.
        data: TIMEZONES.sort() // Because life is easier when we sort. Such a Pythonic call
    })
}

module.exports = {
    getTimeZonesList
};

