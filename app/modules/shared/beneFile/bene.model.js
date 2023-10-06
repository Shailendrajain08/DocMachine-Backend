const beneFile = require("../../projects/models/bene.model").BeneModel;
function addBeneFile(project, callback) {
  // console.log("hiii")
  beneFile.create(project.bene, (err, res) => {
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

function getBene(user, callback) {
  console.log(user);
  beneFile.find({ userId: user.userId }, function (err, user) {
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

function getSingleBene(user, callback) {
  console.log(user);
  beneFile.find({ _id: user.userId }, function (err, user) {
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

function getBeneByName(name, callback) {
  console.log(name);
  beneFile.findOne({ beneName: name.beneName }, function (err, user) {
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

function updateBene(id, bene, callback) {
  console.log(id);
  console.log(bene);
  beneFile.updateOne(
    {
      _id: id,
    },
    { $set: bene },
    function (err, user) {
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
  addBeneFile: addBeneFile,
  getBene: getBene,
  getSingleBene: getSingleBene,
  updateBene: updateBene,
  getBeneByName: getBeneByName,
};
