const otherDocModel = require("./otherDoc.model");

function addOtherDocFile(newPackage, callback) {
    otherDocModel.addOtherDocFile(newPackage, (err, res) => {
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

function getSingleOtherDoc(userId, callback) {
    console.log("hello");
    otherDocModel.getSingleOtherDoc(userId, (err, res) => {
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

function getOtherDoc(userId, callback) {
    console.log("hello");
    otherDocModel.getOtherDoc(userId, (err, res) => {
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

function updateOtherDoc(id, bene, callback) {
    console.log("hello");
    otherDocModel.updateOtherDoc(id, bene, (err, res) => {
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
    addOtherDocFile: addOtherDocFile,
    getSingleOtherDoc: getSingleOtherDoc,
    getOtherDoc: getOtherDoc,
    updateOtherDoc: updateOtherDoc,
};