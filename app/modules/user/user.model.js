const UserModelHelper = require("../projects/model_helpers/user_model.helper");
const bcrypt = require('bcryptjs');
const validators = require("../../helpers/validators");
const Users = require('../projects/models/users.model.js').UserModel;
const ProfileDetailsModel = require('../projects/models/ProfileDetails').ProfileDetailsModel;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const EmailTemplate = require("../projects/model_helpers/email_template");

const addUser = (user, callback) => {
    console.log("ADD USER MODEL ");
    console.log(user);
    let emailId = user.emailId;
    Users.create(user, (err, res) => {
        console.log("USER MODEL RESPONSE");
        console.log(res);
        console.log("THE USER MODEL ERR:", err);
        if (err) {
            console.log("User Model Error: ", err);
            callback(err, null);
        } else if (res) {

            let resp = JSON.parse(JSON.stringify(res));
            if (delete resp.password) {
                EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else if (res) {
                        callback(null, res);
                    } else {
                        callback(null, null);
                    }
                });
                // console.log("User Model Result:", resp);
            } else {
                EmailTemplate.sendVerifyEmail({ emailId }, (err, res) => {
                    if (err) {
                        callback(err, null);
                    } else if (res) {
                        callback(null, res);
                    } else {
                        callback(null, null);
                    }
                });
            }
        } else {
            callback(null, null);
        }
    });
};

const login = (query, callback) => {
    console.log('userModel Data');
    console.log(query);
    UserModelHelper.find({ query }, (err, res) => {
        if (err) {
            console.log("User Model Error", err);
            callback(err, null);
        } else if (res.length > 0) {
            console.log("User Model Result", res);
            callback(null, res);
        } else {
            callback("User Model Result", "Invalid email");
        }
    });
};

const findUser = (query, callback) => {
    console.log("searching for location");
    UserModelHelper.find({ query: query }, (err, res) => {
        if (err) {
            console.log("User Model Error:", err);
            callback(err, null);
        } else if (res.length > 0) {
            console.log("problem for freelancer at model");
            console.log("User Model Result:", res);
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
};

const findUserAndUpdate = (query, data, callback) => {
    // console.log('==========3==========');
    // console.log(data);
    // console.log('-----------------------------------');
    // console.log(query);
    UserModelHelper.update({ query: query, update: data, options: { new: true, select: '-password' } }, (err, res) => {
        //console.log("========5========");
        if (err) {
            // console.log("======err======");
            console.log("User Model Error:", err);
            callback(err, null);
        } else if (res) {
            //console.log("======res======");
            console.log("User Model Result:", res);
            callback(null, res);
        } else {
            //console.log("=====else null=====");
            callback(null, null);
        }
    });
};

// const update = (query, data, callback) => {
//     Users.findOneAndUpdate({query:query,update:data},(err, res) => {
//         if (err) {
//             console.log("User Model Error:", err);
//             callback(err, null);
//         } else if (res) {
//             console.log("User Model Result:", res);
//             callback(null, res);
//         } else {
//             callback(null, null);
//         }
//     });
// }

const createProfile = (userDetails, profileDetails) => {
    return new Promise((resolve, reject) => {

        Users.update({ _id: userDetails._id }, profileDetails, { new: true }).then(
                (data) => resolve(data),
                (err) => reject(err)
            )
            // UserModelHelper.update({
            //         query: {
            //             _id: userDetails._id
            //         },
            //         update: {profileDetails: profileDetails}
            //     }, (err, data) => {
            //         if(err)
            //             reject(err);
            //         else
            //           if(data)
            //             resolve(data)
            //     }
            // )
            // ProfileDetailsModel.create(profileDetails).then(
            //   (data) => {
            //     resolve(data)
            //   },
            //   (err) => {
            //     reject(err)
            //   }
            // )
    })
};

const getProfileDetailsById = (query) => {
    return new Promise((resolve, reject) => {
        Users.findOne(query).then(
            (data) => resolve(data),
            (err) => reject(err)
        )
    })
};

const updateProfileDetails = (query, updateData) => {
    return new Promise((resolve, reject) => {
        UserModelHelper.update(query, updateData, { new: true }).then(
            (data) => {
                resolve(data)
            },
            (err) => {
                reject(err)
            }
        )
    })
};


module.exports = {
    addUser,
    login,
    findUserAndUpdate,
    findUser,
    createProfile,
    getProfileDetailsById,
    updateProfileDetails,
    // update
};