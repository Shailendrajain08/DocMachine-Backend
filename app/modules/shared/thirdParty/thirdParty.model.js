const thirdPartyFile = require("../../projects/models/thirdParty.model");

function addThirdFile(project, callback) {
    console.log("hiii");
    thirdPartyFile.create(project.third, (err, res) => {
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

function getThird(user, callback) {
    console.log(user);
    thirdPartyFile.find({ userId: user.userId }).populate('pipo').exec( function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleThird(user, callback) {
    console.log(user);
    thirdPartyFile.find({ thirdNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateThird(id, bene, callback) {
    console.log(id);
    console.log(bene);
    thirdPartyFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Bene getting successfully:", user);
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
    addThirdFile: addThirdFile,
    getThird: getThird,
    getSingleThird: getSingleThird,
    updateThird: updateThird,
};
