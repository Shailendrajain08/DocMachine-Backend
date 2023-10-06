const creditNoteFile = require("../../projects/models/creditNote.model");

function addCreditFile(project, callback) {
    console.log("hiii");
    creditNoteFile.create(project.credit, (err, res) => {
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

function getCredit(user, callback) {
    console.log(user);
    creditNoteFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
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

function getSingleCredit(user, callback) {
    console.log(user);
    creditNoteFile.find({ creditNoteNumber: user.userId }, function(err, user) {
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

function updateCredit(id, bene, callback) {
    console.log(id);
    console.log(bene);
    creditNoteFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Credit getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addCreditFile: addCreditFile,
    getCredit: getCredit,
    getSingleCredit: getSingleCredit,
    updateCredit: updateCredit,
};
