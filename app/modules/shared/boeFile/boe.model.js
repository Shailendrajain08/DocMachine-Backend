const boeFile = require("../../projects/models/boefile.model").BoeModel;
function addBoeFile(project, callback) {
  if (isNaN(project.insuranceAmount)) {
    project.insuranceAmount = null;
  }
  boeFile.create(project, (err, res) => {
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

function getBoe(user, callback) {
  console.log(user.userId);
  boeFile.find({ userId: user.userId }, function (err, user) {
    console.log(user);
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (user) {
      console.log("project added successfully:", user);
      callback(null, user);
    } else {
      callback(null, null);
    }

  });
}

function getOneBoe(project, callback) {
  console.log("hiii");
  boeFile.findOne(
    {
      _id: "6059ba551bb7562f8abb4421"
    }, function (err, user) {
      console.log(user);
      if (err) {
        console.log("error while adding product:", err);
        callback(err, null);
      } else if (user) {
        console.log("project added successfully:", user);
        callback(null, user);
      } else {
        callback(null, null);
      }

    });
}

function updateBoe(id, project, callback) {
  console.log("hiii");
  console.log(id);
  boeFile.updateOne(
    {
      _id: id
    },
    { $set: project }, function (err, user) {
      console.log(user);
      if (err) {
        console.log("error while adding product:", err);
        callback(err, null);
      } else if (user) {
        console.log("project added successfully:", user);
        callback(null, user);
      } else {
        callback(null, null);
      }

    });
}

function updateBoeByBoe(id, project, callback) {
  console.log("hiii");
  console.log(id);
  boeFile.updateOne(
    {
      boeNumber: id
    },
    { $set: project }, function (err, user) {
      console.log(user);
      if (err) {
        console.log("error while adding product:", err);
        callback(err, null);
      } else if (user) {
        console.log("project added successfully:", user);
        callback(null, user);
      } else {
        callback(null, null);
      }

    });
}

function getBoeByBoe(user, callback) {
  console.log(user);
  boeFile.findOne({ boeNumber: user.boeNumber, userId: user.userId }, function (err, user) {
    console.log(user);
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (user) {
      console.log("project added successfully:", user);
      callback(null, user);
    } else {
      callback(null, null);
    }

  });
}

function getBoeByBene(user, callback) {
  console.log(user);
  boeFile.find({ beneName: user.beneName, userId: user.userId }, function (err, user) {
    console.log(user);
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (user) {
      console.log("project added successfully:", user);
      callback(null, user);
    } else {
      callback(null, null);
    }

  });
}

module.exports = {
  addBoeFile: addBoeFile,
  getBoe: getBoe,
  getOneBoe: getOneBoe,
  updateBoe: updateBoe,
  updateBoeByBoe: updateBoeByBoe,
  getBoeByBoe: getBoeByBoe,
  getBoeByBene: getBoeByBene
};
