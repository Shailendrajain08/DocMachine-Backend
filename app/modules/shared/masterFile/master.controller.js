const MasterModel = require('./master.model');

function addMasterFile(newPackage, callback) {
    MasterModel.addMasterFile(newPackage, (err, res) => {
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

function getMaster(userId, callback) {
    console.log("hello");
    MasterModel.getMaster(userId, (err, res) => {
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

function updateMaster(id, newPackage, callback) {
    console.log("hello");
    console.log(id);
    MasterModel.updateMaster(id, newPackage, (err, res) => {
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

// function updateMasterBySb(sbno, newPackage, callback) {
//     console.log("hello")
//     console.log(sbno)
//     MasterModel.updateMasterBySb(sbno, newPackage, (err, res) => {
//         // console.log("hello")
//         if (err) {
//             callback(err, null);
//         } else if (res) {
//             callback(null, res);
//         } else {
//             callback(null, null);
//         }
//     });
// }

function updateMasterBySb(newPackage, sbno, id, callback) {
    console.log("hello");
    console.log(id);
    console.log(sbno);
    MasterModel.updateMasterBySb(newPackage, sbno, id, (err, res) => {
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

function updateMasterIrInSB(newPackage, sbno, id, callback) {
    console.log("hello");
    console.log(id);
    console.log(sbno);
    console.log(newPackage.irRef)
    MasterModel.updateMasterIrInSB(newPackage, sbno, id, (err, res) => {
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


function getMasterBySb(sb, callback) {
    console.log("hello");
    MasterModel.getMasterBySb(sb, (err, res) => {
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
    addMasterFile: addMasterFile,
    getMaster: getMaster,
    updateMaster: updateMaster,
    updateMasterBySb: updateMasterBySb,
    getMasterBySb: getMasterBySb,
    updateMasterIrInSB: updateMasterIrInSB
};