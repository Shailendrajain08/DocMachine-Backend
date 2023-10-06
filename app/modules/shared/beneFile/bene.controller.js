const BeneModel = require("./bene.model");

function addBeneFile(newPackage, callback) {
  BeneModel.addBeneFile(newPackage, (err, res) => {
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

function getSingleBene(userId, callback) {
  console.log("hello");
  BeneModel.getSingleBene(userId, (err, res) => {
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

function getBeneByName(name, callback) {
  console.log("Hello");
  BeneModel.getBeneByName(name, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      callback(null, res);
    } else {
      callback(null, nul);
    }
  });
}

function getBene(userId, callback) {
  console.log("hello");
  BeneModel.getBene(userId, (err, res) => {
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

function updateBene(id, bene, callback) {
  console.log("hello");
  BeneModel.updateBene(id, bene, (err, res) => {
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
  addBeneFile: addBeneFile,
  getBene: getBene,
  getSingleBene: getSingleBene,
  updateBene: updateBene,
  getBeneByName: getBeneByName,
};
