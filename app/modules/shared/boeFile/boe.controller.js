const BoeModel = require('./boe.model');

function addBoeFile(newPackage, callback) {
    BoeModel.addBoeFile(newPackage, (err, res) => {
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
function getBoe(userId, callback) {
    console.log("hello");
    BoeModel.getBoe(userId, (err, res) => {
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

function updateBoe(id, newPackage, callback) {
    console.log("hello");
    BoeModel.updateBoe(id, newPackage, (err, res) => {
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

function updateBoeByBoe(id, newPackage, callback) {
    console.log("hello");
    BoeModel.updateBoeByBoe(id, newPackage, (err, res) => {
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

function getBoeByBoe(boeNumber, callback) {
    console.log("hello");
    BoeModel.getBoeByBoe(boeNumber, (err, res) => {
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

function getBoeByBene(beneName, callback) {
    console.log("hello");
    BoeModel.getBoeByBene(beneName, (err, res) => {
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
    addBoeFile: addBoeFile,
    getBoe: getBoe,
    updateBoe: updateBoe,
    updateBoeByBoe: updateBoeByBoe,
    getBoeByBoe: getBoeByBoe,
    getBoeByBene: getBoeByBene
};
