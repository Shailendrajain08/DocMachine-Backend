const MasterServiceModel = require("./masterService.model");

function addMasterServiceFile(newPackage, callback) {
    MasterServiceModel.addMasterServiceFile(newPackage, (err, res) => {
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

function getSingleMasterService(userId, callback) {
    console.log("hello");
    MasterServiceModel.getSingleMasterService(userId, (err, res) => {
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

function getMasterService(userId, callback) {
    console.log("hello");
    MasterServiceModel.getMasterService(userId, (err, res) => {
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

function updateMasterService(id, bene, callback) {
    console.log("hello");
    MasterServiceModel.updateMasterService(id, bene, (err, res) => {
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
    addMasterServiceFile: addMasterServiceFile,
    getSingleMasterService: getSingleMasterService,
    getMasterService: getMasterService,
    updateMasterService: updateMasterService,
};