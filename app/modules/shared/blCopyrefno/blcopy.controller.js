const BlCopyModel = require("./blcopy.model");

function addblcopyFile(newPackage, callback) {
    BlCopyModel.addblcopyFile(newPackage, (err, res) => {
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

function getSingleblcopy(userId, callback) {
    console.log("hello");
    BlCopyModel.getSingleblcopy(userId, (err, res) => {
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
function getblcopy(userId, callback) {
    console.log("hello");
    BlCopyModel.getblcopy(userId, (err, res) => {
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
function updateblcopy(id, bene, callback) {
    console.log("hello");
    BlCopyModel.updateblcopy(id, bene, (err, res) => {
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
    addblcopyFile: addblcopyFile,
    getSingleblcopy: getSingleblcopy,
    getblcopy: getblcopy,
    updateblcopy: updateblcopy,
};