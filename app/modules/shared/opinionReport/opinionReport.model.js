const OpinionReportFile = require("../../projects/models/opinionReports.model");

function addOpinionReportFile(project, callback) {
    console.log("hiii");
    OpinionReportFile.create(project.opinionReport, (err, res) => {
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

function getOpinionReport(user, callback) {
    console.log(user);
    OpinionReportFile.find({ userId: user.userId }).populate('pipo').exec( function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("opinionReport getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleOpinionReport(user, callback) {
    console.log(user);
    OpinionReportFile.find({ opinionReportNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("opinionReport getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateOpinionReport(id, bene, callback) {
    console.log(id);
    console.log(bene);
    OpinionReportFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("opinionReport getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addOpinionReportFile: addOpinionReportFile,
    getOpinionReport: getOpinionReport,
    getSingleOpinionReport: getSingleOpinionReport,
    updateOpinionReport: updateOpinionReport,
};
