const Member = require("../../projects/models/member.model").MemberModel;
const Team = require("../../projects/models/team.model").TeamModel;
const sgMail = require("@sendgrid/mail");
const EmailTemplate = require("../../projects/model_helpers/email_template");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function addMember(project, data, callback) {
  console.log("Project", project);
  console.log("Project", data);
  EmailTemplate.sendMemberEmail(project, data, (err, res) => {
    if (err) {
      callback(err, null);
    } else if (res) {
      Member.create(project, (err, res) => {
        if (err) {
          console.log("error while adding product:", err);
          callback(err, null);
        } else if (res) {
          console.log(res);
          Team.updateOne(
            {
              _id: res.teamId,
            },
            { $push: { member: res._id } },
            function (err, user) {
              console.log(user);
              if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
              } else if (user) {
                console.log("Member added successfully:", user);
                //callback(null, user);
              } else {
                callback(null, null);
              }
            }
          );
          console.log("Member added successfully:", res);
          callback(null, res);
        } else {
          callback(null, null);
        }
      });
    } else {
      callback(null, null);
    }
  });

}

function getMember(user, callback) {
  console.log(user);
  Member.find({ teamId: user }, function (err, user) {
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

// function getBoe(user, callback) {
//   console.log(user.userId)
//   boeFile.find({userId: user.userId }, function (err, user) {
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
  addMember: addMember,
  getMember: getMember,
  // getBoe: getBoe,
  // getOneBoe: getOneBoe,
  // updateBoe: updateBoe,
  // updateBoeByBoe: updateBoeByBoe,
  // getBoeByBoe: getBoeByBoe
};
