const buyerFile = require("../../projects/models/buyer.model").BuyerModel;
function addBuyerFile(project, callback) {
    // console.log("hiii")
    buyerFile.create(project.buyer, (err, res) => {
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

function getBuyer(user, callback) {
    console.log(user);
    buyerFile.find({ userId: user.userId }, function (err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Buyer getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleBuyer(user, callback) {
    console.log(user);
    buyerFile.find({ _id: user.userId }, function (err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Buyer getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getBuyerByName(name, callback) {
    console.log(name);
    buyerFile.findOne({ buyerName: name.buyerName }, function (err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("Error while getting user: ", err);
            callback(err, null);
        } else if (user) {
            console.log("Benne getting successfully: ", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateBuyer(id, buyer, callback) {
    console.log(id);
    console.log(buyer);
    buyerFile.updateOne(
        {
            _id: id,
        },
        { $set: buyer },
        function (err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Buyer getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

// function getOneBoe (project, callback) {
//   console.log("hiii")
//   boeFile.findOne(
//     {
//       _id:"6059ba551bb7562f8abb4421"
//   }, function (err, user) {
//     console.log(user)
//     if (err) {
//       console.log("error while adding product:", err);
//       callback(err, null);
//     } else if (user) {
//       console.log("project added successfully:", user);
//       callback(null, user);
//     } else {
//       callback(null, null);
//     }
//    } );
// }

// function updateBoe (id, project, callback) {
//   console.log("hiii")
//   console.log(id)
//   boeFile.updateOne(
//     {
//       _id:id
//     },
//     { $set: project }, function (err, user) {
//     console.log(user)
//     if (err) {
//       console.log("error while adding product:", err);
//       callback(err, null);
//     } else if (user) {
//       console.log("project added successfully:", user);
//       callback(null, user);
//     } else {
//       callback(null, null);
//     }
//    } );
// }

// function updateBoeByBoe(id, project, callback) {
//   console.log("hiii")
//   console.log(id)
//   boeFile.updateOne(
//     {
//       boeNumber:id
//     },
//     { $set: project }, function (err, user) {
//     console.log(user)
//     if (err) {
//       console.log("error while adding product:", err);
//       callback(err, null);
//     } else if (user) {
//       console.log("project added successfully:", user);
//       callback(null, user);
//     } else {
//       callback(null, null);
//     }
//    } );
// }

// function getBoeByBoe(user, callback) {
//   console.log(user)
//   boeFile.findOne({boeNumber: user.boeNumber }, function (err, user) {
//     console.log(user)
//     if (err) {
//       console.log("error while adding product:", err);
//       callback(err, null);
//     } else if (user) {
//       console.log("project added successfully:", user);
//       callback(null, user);
//     } else {
//       callback(null, null);
//     }
//    } );
// }

module.exports = {
    addBuyerFile: addBuyerFile,
    getBuyer: getBuyer,
    getSingleBuyer: getSingleBuyer,
    updateBuyer: updateBuyer,
    getBuyerByName: getBuyerByName,
};
