const irAdviceModel = require('./irAdvice.model');

function addIrAdviceFile(newPackage, callback) {
    irAdviceModel.addIrAdviceFile(newPackage, (err, res) => {
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

function getIrAdvice(userId, callback) {
    console.log("hello");
    irAdviceModel.getIrAdvice(userId, (err, res) => {
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

function updateIrAdvice(id, newPackage, callback) {
    console.log("hello");
    irAdviceModel.updateIrAdvice(id, newPackage, (err, res) => {
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

function updateIrAdviceByIrAdvice(id, newPackage, callback) {
    console.log("hello");
    irAdviceModel.updateIrAdviceByIrAdvice(id, newPackage, (err, res) => {
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

function getIrAdviceByIrAdvice(billNo, callback) {
    console.log("hello");
    irAdviceModel.getIrAdviceByIrAdvice(billNo, (err, res) => {
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

function getIrAdviceByBillNo(billNo, callback) {
    console.log("hello");
    irAdviceModel.getIrAdviceByBillNo(billNo, (err, res) => {
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

function updateIrAdviceByIr(id, newPackage, userId, callback) {
    console.log("hello");
    irAdviceModel.updateIrAdviceByIr(id, newPackage, userId, (err, res) => {
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
    addIrAdviceFile: addIrAdviceFile,
    getIrAdvice: getIrAdvice,
    updateIrAdvice: updateIrAdvice,
    updateIrAdviceByIrAdvice: updateIrAdviceByIrAdvice,
    getIrAdviceByIrAdvice: getIrAdviceByIrAdvice,
    getIrAdviceByBillNo: getIrAdviceByBillNo,
    updateIrAdviceByIr: updateIrAdviceByIr
};