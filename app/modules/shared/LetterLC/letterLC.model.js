const letterLCFile = require("../../projects/models/letterLC.model");

function addLetterLCFile(project, callback) {
    letterLCFile.create(project.letterLC, (err, res) => {
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

function getLetterLC(user, callback) {
    console.log(user);
    letterLCFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("letterLC getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleLetterLC(user, callback) {
    console.log(user);
    letterLCFile.find({ letterOfCreditNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("InsuranceDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateLetterLC(id, bene, callback) {
    console.log(id);
    console.log(bene);
    letterLCFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("letterLC getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addLetterLCFile: addLetterLCFile,
    getLetterLC: getLetterLC,
    getSingleLetterLC: getSingleLetterLC,
    updateLetterLC: updateLetterLC,
};
