const MemberModel = require("./member.model");

function addMember(newPackage, data, callback) {
  MemberModel.addMember(newPackage, data, (err, res) => {
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

function getMember(userId, callback) {
  console.log("hello");
  MemberModel.getMember(userId, (err, res) => {
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

// function getBoe(userId, callback) {
//     console.log("hello")
//     BoeModel.getBoe(userId, (err, res) => {
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
  addMember: addMember,
  getMember: getMember,
  // getBoe: getBoe,
  // updateBoe: updateBoe,
  // updateBoeByBoe: updateBoeByBoe,
  // getBoeByBoe: getBoeByBoe
};
