const LetterLCModel = require("./letterLC.model");

function addLetterLCFile(newPackage, callback) {
    LetterLCModel.addLetterLCFile(newPackage, (err, res) => {
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

function getSingleLetterLC(userId, callback) {
    console.log("hello");
    LetterLCModel.getSingleLetterLC(userId, (err, res) => {
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

function getLetterLC(userId, callback) {
    console.log("hello");
    LetterLCModel.getLetterLC(userId, (err, res) => {
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

function updateLetterLC(id, bene, callback) {
    console.log("hello");
    LetterLCModel.updateLetterLC(id, bene, (err, res) => {
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
    addLetterLCFile: addLetterLCFile,
    getSingleLetterLC: getSingleLetterLC,
    getLetterLC: getLetterLC,
    updateLetterLC: updateLetterLC,
};