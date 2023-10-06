const OpinionReportModel = require("./opinionReport.model");

function addOpinionReportFile(newPackage, callback) {
    OpinionReportModel.addOpinionReportFile(newPackage, (err, res) => {
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

function getSingleOpinionReport(userId, callback) {
    console.log("hello");
    OpinionReportModel.getSingleOpinionReport(userId, (err, res) => {
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

function getOpinionReport(userId, callback) {
    console.log("hello");
    OpinionReportModel.getOpinionReport(userId, (err, res) => {
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

function updateOpinionReport(id, bene, callback) {
    console.log("hello");
    OpinionReportModel.updateOpinionReport(id, bene, (err, res) => {
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
    addOpinionReportFile: addOpinionReportFile,
    getSingleOpinionReport: getSingleOpinionReport,
    getOpinionReport: getOpinionReport,
    updateOpinionReport: updateOpinionReport,
};