const postTeam = require("../../projects/models/team.model").TeamModel;
const postUser = require("../../projects/models/users.model").UserModel;
function addTeam(project, callback) {
  console.log(project.team);
  console.log(project.team);
  console.log("hiii");
  postTeam.create(project.team, (err, res) => {
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (res) {
      postUser.updateOne(
        {
          _id: project.team.userId
        },
        { $set: { "companyId": res._id, "companyName": project.team.teamName } }, function (err, user) {
          console.log(user);
          if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
          } else if (user) {
            console.log("Bene getting successfully:", user);
            //callback(null, user);
          } else {
            callback(null, null);
          }

        });
      console.log("project added successfully:", res);
      callback(null, res);
    } else {
      callback(null, null);
    }
  });
}


function getTeam(user, callback) {
  console.log(user);
  postTeam.find({ _id: user }, function (err, user) {
    console.log(user);
    console.log(err);
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (user) {
      console.log("Company details getting successfully:", user);
      callback(null, user);
    } else {
      callback(null, null);
    }

  });
}

function updateTeam(id, team, callback) {
  console.log(id);
  console.log(team);
  postTeam.updateOne(
    {
      _id: id
    },
    { $set: team }, function (err, user) {
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

    });
}

module.exports = {
  addTeam: addTeam,
  getTeam: getTeam,
  updateTeam: updateTeam

};
