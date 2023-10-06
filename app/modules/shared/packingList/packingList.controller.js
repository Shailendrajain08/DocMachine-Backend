const packingListModel = require("./packingList.model");

function addPackingListFile(newPackage, callback) {
    packingListModel.addPackingListFile(newPackage, (err, res) => {
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

function getSinglePackingList(userId, callback) {
    console.log("hello");
    packingListModel.getSinglePackingList(userId, (err, res) => {
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

function getPackingList(userId, callback) {
    console.log("hello");
    packingListModel.getPackingList(userId, (err, res) => {
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

function updatePackingList(id, bene, callback) {
    console.log("hello");
    packingListModel.updatePackingList(id, bene, (err, res) => {
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
    addPackingListFile: addPackingListFile,
    getSinglePackingList: getSinglePackingList,
    getPackingList: getPackingList,
    updatePackingList: updatePackingList,
};