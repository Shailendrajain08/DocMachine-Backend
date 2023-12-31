const ThirdModel = require("./thirdParty.model");

function addThirdFile(newPackage, callback) {
    ThirdModel.addThirdFile(newPackage, (err, res) => {
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

function getSingleThird(userId, callback) {
    console.log("hello");
    ThirdModel.getSingleThird(userId, (err, res) => {
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

function getThird(userId, callback) {
    console.log("hello");
    ThirdModel.getThird(userId, (err, res) => {
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

function updateThird(id, bene, callback) {
    console.log("hello");
    ThirdModel.updateThird(id, bene, (err, res) => {
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
    addThirdFile: addThirdFile,
    getThird: getThird,
    getSingleThird: getSingleThird,
    updateThird: updateThird,
};
