const billOfExchangeModel = require("./billOfExchange.model");

function addBillOfExchangeFile(newPackage, callback) {
    billOfExchangeModel.addBillOfExchangeFile(newPackage, (err, res) => {
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

function getSingleBillOfExchange(userId, callback) {
    console.log("hello");
    billOfExchangeModel.getSingleBillOfExchange(userId, (err, res) => {
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

function getBillOfExchange(userId, callback) {
    console.log("hello");
    billOfExchangeModel.getBillOfExchange(userId, (err, res) => {
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

function updateBillOfExchange(id, bene, callback) {
    console.log("hello");
    billOfExchangeModel.updateBillOfExchange(id, bene, (err, res) => {
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
    addBillOfExchangeFile: addBillOfExchangeFile,
    getSingleBillOfExchange: getSingleBillOfExchange,
    getBillOfExchange: getBillOfExchange,
    updateBillOfExchange: updateBillOfExchange,
};