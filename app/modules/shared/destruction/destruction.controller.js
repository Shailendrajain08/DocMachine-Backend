const DestructionModel = require("./destruction.model");

function addDestructionFile(newPackage, callback) {
    DestructionModel.addDestructionFile(newPackage, (err, res) => {
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

function getSingleDestruction(userId, callback) {
    console.log("hello");
    DestructionModel.getSingleDestruction(userId, (err, res) => {
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

function getDestruction(userId, callback) {
    console.log("hello");
    DestructionModel.getDestruction(userId, (err, res) => {
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

function updateDestruction(id, bene, callback) {
    console.log("hello");
    DestructionModel.updateDestruction(id, bene, (err, res) => {
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
    addDestructionFile: addDestructionFile,
    getSingleDestruction: getSingleDestruction,
    getDestruction: getDestruction,
    updateDestruction: updateDestruction,
};