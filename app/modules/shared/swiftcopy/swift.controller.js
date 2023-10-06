const SwiftCopyModel = require("./swift.model");

function addSwiftFile(newPackage, callback) {
    SwiftCopyModel.addSwiftFile(newPackage, (err, res) => {
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

function getSingleSwift(userId, callback) {
    console.log("hello");
    SwiftCopyModel.getSingleSwift(userId, (err, res) => {
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
function getSwift(userId, callback) {
    console.log("hello");
    SwiftCopyModel.getSwift(userId, (err, res) => {
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
function updateSwift(id, bene, callback) {
    console.log("hello");
    SwiftCopyModel.updateSwift(id, bene, (err, res) => {
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
    addSwiftFile: addSwiftFile,
    getSingleSwift: getSingleSwift,
    getSwift: getSwift,
    updateSwift: updateSwift,
};