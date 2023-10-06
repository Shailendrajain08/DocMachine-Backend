const edpmsModel = require('./edpms.model');

function addEdpms(newPackage, callback) {
    edpmsModel.addEdpms(newPackage, (err, res) => {
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

function getEdpms(userId, callback) {
    console.log("hello");
    edpmsModel.getEdpms(userId, (err, res) => {
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

function updateEdpms(id, newPackage, callback) {
    console.log("hello");
    edpmsModel.updateEdpms(id, newPackage, (err, res) => {
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

function updateEdpmsByEdpms(id, newPackage, callback) {
    console.log("hello");
    edpmsModel.updateEdpmsByEdpms(id, newPackage, (err, res) => {
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

function getEdpmsByEdpms(billNo, callback) {
    console.log("hello");
    edpmsModel.getEdpmsByEdpms(billNo, (err, res) => {
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

function getEdpmsBySb(billNo, callback) {
    console.log("hello");
    edpmsModel.getEdpmsBySb(billNo, (err, res) => {
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
    addEdpms: addEdpms,
    getEdpms: getEdpms,
    updateEdpms: updateEdpms,
    updateEdpmsByEdpms: updateEdpmsByEdpms,
    getEdpmsByEdpms: getEdpmsByEdpms,
    getEdpmsBySb: getEdpmsBySb

};
