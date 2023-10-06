const AirwayBlCopyModel = require("./airwayBlCopy.model");

function addAirwayBlcopyFile(newPackage, callback) {
    AirwayBlCopyModel.addAirwayBlcopyFile(newPackage, (err, res) => {
        // console.log("hello")
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }

    });
}

function getSingleAirwayBlcopy(userId, callback) {
    console.log("hello");
    AirwayBlCopyModel.getSingleAirwayBlcopy(userId, (err, res) => {
        // console.log("hello")
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getAirwayBlcopy(userId, callback) {
    console.log("hello");
    AirwayBlCopyModel.getAirwayBlcopy(userId, (err, res) => {
        // console.log("hello")
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateAirwayBlcopy(id, bene, callback) {
    console.log("hello");
    AirwayBlCopyModel.updateAirwayBlcopy(id, bene, (err, res) => {
        // console.log("hello")
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
module.exports = {
    addAirwayBlcopyFile: addAirwayBlcopyFile,
    getSingleAirwayBlcopy: getSingleAirwayBlcopy,
    getAirwayBlcopy: getAirwayBlcopy,
    updateAirwayBlcopy: updateAirwayBlcopy,
};