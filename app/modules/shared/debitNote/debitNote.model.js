const debitNoteFile = require("../../projects/models/debitNote.model");
const letterLCFile = require("../../projects/models/letterLC.model");

function addDebitFile(project, callback) {
    console.log("hiii");
    debitNoteFile.create(project.debit, (err, res) => {
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (res) {
            console.log("project added successfully:", res);
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getDebit(user, callback) {
    console.log(user);
    debitNoteFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("debit getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleDebit(user, callback) {
    console.log(user);
    debitNoteFile.find({ debitNoteNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Debit getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateDebit(id, bene, callback) {
    console.log(id);
    console.log(bene);
    debitNoteFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Debit getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addDebitFile: addDebitFile,
    getDebit: getDebit,
    getSingleDebit: getSingleDebit,
    updateDebit: updateDebit,
};
