const commercialModel = require("./commercial.model");

function addCommercialFile(newPackage, callback) {
    commercialModel.addCommercialFile(newPackage, (err, res) => {
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

function getSingleCommercial(userId, callback) {
    console.log("hello");
    commercialModel.getSingleCommercial(userId, (err, res) => {
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

function getCommercial(userId, callback) {
    console.log("hello");
    commercialModel.getCommercial(userId, (err, res) => {
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

function updateCommercial(id, bene, callback) {
    console.log("hello");
    commercialModel.updateCommercial(id, bene, (err, res) => {
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
    addCommercialFile: addCommercialFile,
    getSingleCommercial: getSingleCommercial,
    getCommercial: getCommercial,
    updateCommercial: updateCommercial,
};