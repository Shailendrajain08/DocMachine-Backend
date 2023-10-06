const BuyerModel = require("./buyer.model");

function addBuyerFile(newPackage, callback) {
    BuyerModel.addBuyerFile(newPackage, (err, res) => {
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

function getSingleBuyer(userId, callback) {
    console.log("hello");
    BuyerModel.getSingleBuyer(userId, (err, res) => {
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

function getBuyerByName(name, callback) {
    console.log("Hello");
    BuyerModel.getBuyerByName(name, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, nul);
        }
    });
}

function getBuyer(userId, callback) {
    console.log("hello");
    BuyerModel.getBuyer(userId, (err, res) => {
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

function updateBuyer(id, buyer, callback) {
    console.log("hello");
    BuyerModel.updateBuyer(id, buyer, (err, res) => {
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
    addBuyerFile: addBuyerFile,
    getBuyer: getBuyer,
    getSingleBuyer: getSingleBuyer,
    updateBuyer: updateBuyer,
    getBuyerByName: getBuyerByName,
};
