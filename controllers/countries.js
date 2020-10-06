const {COUNTRIES} = require("../constants");

const getCountriesList = (req, res) => {
    res.send({
        msg: "Success", // as if it will be anything else.
        data: COUNTRIES.sort() // Because life is easier when we sort. Such a Pythonic call
    })
}

module.exports = {
    getCountriesList
};
