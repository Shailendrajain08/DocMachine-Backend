const billOfExchangeFile = require("../../projects/models/billOfExchange.model");

function addBillOfExchangeFile(project, callback) {
    console.log("hiii");
    billOfExchangeFile.create(project.billOfExchange, (err, res) => {
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

function getBillOfExchange(user, callback) {
    console.log(user);
    billOfExchangeFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("BillOfExchange getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleBillOfExchange(user, callback) {
    console.log(user);
    billOfExchangeFile.find({ billExchangeNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("BillOfExchangeDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateBillOfExchange(id, bene, callback) {
    console.log(id);
    console.log(bene);
    billOfExchangeFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("BillOfExchangeDoc getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addBillOfExchangeFile: addBillOfExchangeFile,
    getBillOfExchange: getBillOfExchange,
    getSingleBillOfExchange: getSingleBillOfExchange,
    updateBillOfExchange: updateBillOfExchange,
};
