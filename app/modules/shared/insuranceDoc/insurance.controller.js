const InsuranceModel = require("./insurance.model");

function addInsuranceFile(newPackage, callback) {
    InsuranceModel.addInsuranceFile(newPackage, (err, res) => {
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

function getSingleInsurance(userId, callback) {
    console.log("hello");
    InsuranceModel.getSingleInsurance(userId, (err, res) => {
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

function getInsurance(userId, callback) {
    console.log("hello");
    InsuranceModel.getInsurance(userId, (err, res) => {
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

function updateInsurance(id, bene, callback) {
    console.log("hello");
    InsuranceModel.updateInsurance(id, bene, (err, res) => {
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
    addInsuranceFile: addInsuranceFile,
    getSingleInsurance: getSingleInsurance,
    getInsurance: getInsurance,
    updateInsurance: updateInsurance,
};