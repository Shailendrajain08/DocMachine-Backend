const CreditNoteModel = require("./creditNote.model");

function addCreditFile(newPackage, callback) {
    CreditNoteModel.addCreditFile(newPackage, (err, res) => {
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

function getSingleCredit(userId, callback) {
    console.log("hello");
    CreditNoteModel.getSingleCredit(userId, (err, res) => {
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

function getCredit(userId, callback) {
    console.log("hello");
    CreditNoteModel.getCredit(userId, (err, res) => {
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

function updateCredit(id, bene, callback) {
    console.log("hello");
    CreditNoteModel.updateCredit(id, bene, (err, res) => {
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
    addCreditFile: addCreditFile,
    getSingleCredit: getSingleCredit,
    getCredit: getCredit,
    updateCredit: updateCredit,
};