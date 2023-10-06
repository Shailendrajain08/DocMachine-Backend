const DebitNoteModel = require("./debitNote.model");

function addDebitFile(newPackage, callback) {
    DebitNoteModel.addDebitFile(newPackage, (err, res) => {
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

function getSingleDebit(userId, callback) {
    console.log("hello");
    DebitNoteModel.getSingleDebit(userId, (err, res) => {
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

function getDebit(userId, callback) {
    console.log("hello");
    DebitNoteModel.getDebit(userId, (err, res) => {
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

function updateDebit(id, bene, callback) {
    console.log("hello");
    DebitNoteModel.updateDebit(id, bene, (err, res) => {
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
    addDebitFile: addDebitFile,
    getSingleDebit: getSingleDebit,
    getDebit: getDebit,
    updateDebit: updateDebit,
};