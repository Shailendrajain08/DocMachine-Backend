const PipoModel = require("./pi_po.model");

function addPipoFile(newPackage, callback) {
    PipoModel.addPipoFile(newPackage, (err, res) => {
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

function getSinglePipo(id, callback) {
    console.log("hello");
    PipoModel.getSinglePipo(id, (err, res) => {
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

function getPipo(userId, callback) {
    console.log("hello");
    PipoModel.getPipo(userId, (err, res) => {
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

function updatePipo(id, bene, callback) {
    console.log("hello");
    PipoModel.updatePipo(id, bene, (err, res) => {
        console.log("hello", res);
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateSinglePipo(id, file, doc, callback) {
    console.log("hello");
    PipoModel.updateSinglePipo(id, file, doc, (err, res) => {
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

function updateManyPipo(id, file, doc,data, userId, callback) {
    console.log("hello");
    PipoModel.updateManyPipo(id, file, doc,data, userId, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateManyPipo1(id, file, callback) {
    console.log("hello");
    PipoModel.updateManyPipo1(id, file, (err, res) => {
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

function getManyPipo(pipo, id, callback) {
    console.log("hello");
    PipoModel.getManyPipo(pipo, id, (err, res) => {
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

function getPipoByBene(beneName, callback) {
    console.log("hello");
    PipoModel.getPipoByBene(beneName, (err, res) => {
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
// function updateBoe(id,newPackage, callback) {
//     console.log("hello")
//     BoeModel.updateBoe(id, newPackage, (err, res) => {
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

// function updateBoeByBoe(id,newPackage, callback) {
//     console.log("hello")
//     BoeModel.updateBoeByBoe(id, newPackage, (err, res) => {
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

// function getBoeByBoe(boeNumber, callback) {
//     console.log("hello")
//     BoeModel.getBoeByBoe(boeNumber, (err, res) => {
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

module.exports = {
    addPipoFile: addPipoFile,
    getPipo: getPipo,
    getSinglePipo: getSinglePipo,
    updatePipo: updatePipo,
    updateSinglePipo: updateSinglePipo,
    updateManyPipo: updateManyPipo,
    getManyPipo: getManyPipo,
    getPipoByBene: getPipoByBene,
    updateManyPipo1: updateManyPipo1
};
