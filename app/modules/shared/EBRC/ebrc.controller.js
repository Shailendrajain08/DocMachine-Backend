const EbrcCopyModel = require("./ebrc.model");

function addEbrcFile(newPackage, callback) {
    EbrcCopyModel.addEbrcFile(newPackage, (err, res) => {
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

function getSingleEbrc(userId, callback) {
    console.log("hello");
    EbrcCopyModel.getSingleEbrc(userId, (err, res) => {
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
function getEbrc(userId, callback) {
    console.log("hello");
    EbrcCopyModel.getEbrc(userId, (err, res) => {
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
function updateEbrc(id, bene, callback) {
    console.log("hello");
    EbrcCopyModel.updateEbrc(id, bene, (err, res) => {
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
    addEbrcFile: addEbrcFile,
    getSingleEbrc: getSingleEbrc,
    getEbrc: getEbrc,
    updateEbrc: updateEbrc,
};