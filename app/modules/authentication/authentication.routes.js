const express = require("express");
const router = express.Router();
const AuthCtrl = require("./authentication.controller");
const resp = require("../../helpers/responseHelpers");
module.exports = router;
const UserCtrl = require("../user/user.controller");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const AWS = require("../../helpers/aws-S3");
const aws = require("aws-sdk");
const uploadImage = require('../../helpers/helper');
const postDocument = require('../shared/documents/document.controller');
const UserModel = require('../projects/models/users.model').UserModel;
const sgMail = require('@sendgrid/mail');
const EmailFormat = require('../mails/mailhelper/email-store/email-formats');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require('dotenv').config({ path: '.env' });

let config = {
    localConfig: {
        frontend: {
            url: process.env.LOCAL
        }
    },
    betaConfig: {
        frontend: {
            url: process.env.BETA
        }
    },
    devConfig: {
        frontend: {
            url: process.env.DEV
        }
    },
    prodConfig: {
        frontend: {
            url: process.env.PROD
        }
    }
};

router.post("/signup", (req, res) => {
    console.log(req.body.user);
    req.body.user.emailId = req.body.user.email;
    if (req.body.user) {
        UserModel.findOne({
            emailId: req.body.user.emailId
        }, function(err, user) {
            console.log(user);
            console.log(err);
            if (err) {
                console.log("error while adding product:", err);
                console.log(req.body.user);
                console.log('hello');
                req.body.user["iniReg"] = "Native";
                console.log(req.body.user.emailId);
                const email = req.body.user.emailId;
                if (req.body.user["confirmPassword"] != req.body.user["password"]) {
                    return res.status(501).send(`Both password should be same`);
                }

                req.body.user["user_name"] =
                    email.substring(0, email.indexOf("@")) +
                    "_" +
                    email.substring(email.indexOf("@") + 1, email.indexOf(".")) +
                    "_" +
                    email.substring(email.indexOf(".") + 1, email.length);
                delete req.body.user["confirmPassword"];
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body.user);
                AuthCtrl.signUpUser(user_data, (err1, docs) => {
                    if (err1) {
                        if (err1.name && err1.name === "ValidationError") {
                            resp.errorResponse(res, "Required Fields Are Missing");
                        } else if (err1.code && err1.code === 11000) {
                            resp.alreadyRegistered(res, "Email Id Already Registered");
                        } else {
                            resp.errorResponse(res, "Internal Server Error");
                        }
                    } else if (docs) {
                        resp.successPostResponse(res, docs, "Successfully Signed Up New User");
                    } else {
                        resp.noRecordsFound(res, "Can't Add New User");
                    }
                });
            } else if (user) {
                return res.status(501).send(`Email ID already exist`);
            } else {
                console.log(req.body.user);
                console.log('hello');
                req.body.user["iniReg"] = "Native";
                const email = req.body.user.emailId;
                if (req.body.user["confirmPassword"] != req.body.user["password"]) {
                    return res.status(501).send(`Both password should be same`);
                }

                req.body.user["user_name"] =
                    email.substring(0, email.indexOf("@")) +
                    "_" +
                    email.substring(email.indexOf("@") + 1, email.indexOf(".")) +
                    "_" +
                    email.substring(email.indexOf(".") + 1, email.length);
                delete req.body.user["confirmPassword"];
                let user_data = AuthCtrl.capitaliseFirstLetter(req.body.user);
                AuthCtrl.signUpUser(user_data, (err, docs) => {
                    if (err) {
                        if (err.name && err.name === "ValidationError") {
                            resp.errorResponse(res, "Required Fields Are Missing");
                        } else if (err.code && err.code === 11000) {
                            resp.alreadyRegistered(res, "Email Id Already Registered");
                        } else {
                            resp.errorResponse(res, "Internal Server Error");
                        }
                    } else if (docs) {
                        resp.successPostResponse(res, docs, "Successfully Signed Up New User");
                    } else {
                        resp.noRecordsFound(res, "Can't Add New User");
                    }
                });
            }

        });

    } else {
        resp.missingBody(res, "Missing Body");
    }
});


router.post("/login", (req, res) => {
    console.log("hello");
    console.log(req.headers);
    if (req.headers && req.headers.authorization) {
        headers = req.get("authorization");
        headers = headers.split(" ");
        const mode_of_reg = "Native";
        AuthCtrl.userLogin(headers[1], mode_of_reg, (err, docs) => {
            if (err) {
                if (err.name && err.name === "wrong mode of login")
                    resp.alreadyRegisteredWithGoogle(
                        res,
                        "Email logged in through google please login through Google!"
                    );
                else resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, docs, "Authenticated");
            } else {
                resp.noRecordsFound(res, "Invalid Email-ID/Password");
            }
        });
    } else {
        resp.missingBody(res, "Missing Email-ID/Password");
    }
});

router.post("/emailverification", function(req, res) {
    if (req.user) {
        AuthCtrl.verifyEmail(req.query.emailId, req.body.emailIdVerified, function(
            err,
            docs
        ) {
            if (err) {
                resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, "Email Id successfully verified");
            } else {
                resp.noRecordsFound(res, "No Email Id  Found");
            }
        });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.get("/verify/:token", function(req, res, next) {
    try {
        let user = jwt.verify(req.params.token, SECRET);
        AuthCtrl.verifyEmail(user._id, true, function(err, docs) {
            if (err) {
                resp.errorResponse(res);
            } else if (docs) {
                resp.successPostResponse(res, docs);
            } else {
                resp.noRecordsFound(res, "Invalid Token");
            }
        });
    } catch (err) {
        res.json(err.name);
    }
});

// router.put("/verify", function (req, res) {
//   console.log(req)
//   let isVerified = speakeasy.totp.verify({
//     secret: commons.userObject.tfa.tempSecret,
//     encoding: 'base32',
//     token: req.body.token
//   });

//   if (isVerified) {
//     console.log(`DEBUG: TFA is verified to be enabled`);
//     commons.userObject.tfa.secret = commons.userObject.tfa.tempSecret;
//     return res.send({
//       "status": 200,
//       "message": "Two-factor Auth is enabled successfully"
//     });
//   }
// });

router.put("/forgotpsw", function(req, res) {
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, function(err, user) {
            console.log(user);
            console.log(err);
            if (err) {
                console.log("error while adding product:", err);
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            } else if (user) {
                AuthCtrl.forgotpsw(req.body.emailId, function(err, docs) {
                    if (err) {
                        resp.errorResponse(
                            res,
                            err,
                            501,
                            "Internal Server Error, Please Try Again Later"
                        );
                    } else if (docs) {
                        resp.successPostResponse(
                            res,
                            null,
                            `Password Reset Link Has Been Sent To Your Email Id ${req.body.emailId
                }`
                        );
                    } else {
                        resp.noRecordsFound(res, "Invalid Email Id");
                    }
                });
            } else {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            }

        });
        // AuthCtrl.forgotpsw(req.body.emailId, function (err, docs) {
        //   if (err) {
        //     resp.errorResponse(
        //       res,
        //       err,
        //       501,
        //       "Internal Server Error, Please Try Again Later"
        //     );
        //   } else if (docs) {
        //     resp.successPostResponse(
        //       res,
        //       null,
        //       `Password Reset Link Has Been Sent To Your Email Id ${req.body.emailId
        //       }`
        //     );
        //   } else {
        //     resp.noRecordsFound(res, "Invalid Email Id");
        //   }
        // });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

// router.put("/updatePassword", (req, res) => {
//   if (req.query.emailId && req.body.newPassword ) {
//     UserCtrl.resetpsw(req.query.emailId, req.body.newPassword, function(err,docs) {
//       if (err) {
//         resp.errorResponse(
//           res,
//           err,
//           501,
//           "Internal Server Error, Please Try Again Later"
//         );
//       } else if (docs) {
//         resp.successPostResponse(
//           res,
//           null,
//           `Password Has Been Updated Successfully`
//         );
//       } else {
//         resp.noRecordsFound(res, "Invalid Email Id");
//       }
//     });
//   } else {
//     resp.missingBody(res, "Missing Body");
//   }
// });

router.put("/updatepsw", function(req, res) {
    if (req.body.emailId && req.body.newPassword) {
        UserCtrl.resetpsw(req.body.emailId, req.body.newPassword, function(
            err,
            docs
        ) {
            if (err) {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "Internal Server Error, Please Try Again Later"
                );
            } else if (docs) {
                resp.successPostResponse(
                    res,
                    null,
                    `Password Has Been Updated Successfully`
                );
            } else {
                resp.noRecordsFound(res, "Invalid Email Id");
            }
        });
    } else {
        resp.missingBody(res, "Missing Body");
    }
});


router.put("/updateemail", function(req, res) {
    console.log('hhshsshsh');
    if (req.body.emailId) {
        UserModel.updateOne({
                emailId: req.body.emailId,
            },

            { $set: { "emailIdVerified": true } },
            function(err, user) {
                console.log(user);
                if (err) {
                    console.log("error while adding product:", err);
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                } else if (user) {
                    let appConfig = {};
                    console.log('environment variables passed', process.env.deployment);
                    switch (process.env.deployment) {
                        case 'local':
                            appConfig = config.localConfig;
                            break;
                        case 'beta':
                            appConfig = config.betaConfig;
                            break;
                        case 'dev':
                            appConfig = config.devConfig;
                            break;
                        case 'prod':
                            appConfig = config.prodConfig;
                            break;
                        default:
                            console.log('loading local environment 111');
                            appConfig = config.localConfig
                    }
                    const html = EmailFormat.generalFormat({ html: `User Logged in with ${req.body.emailId} to DocMachine please check `, heading: "New User Registered", host: appConfig.frontend.url });
                    const msg = {
                        to: ['docmachinetec@gmail.com', 'tramsdocmachine@gmail.com', 'fintech.innovations2021@gmail.com'], // Change to your recipient
                        from: "admin@docmachine.in", // Change to your verified sender
                        subject: "New User Registered",
                        text: "New User Registered",
                        html: html
                    };

                    sgMail
                        .send(msg)
                        .then(() => {
                            res.status(200)
                                .json({
                                    message: "Verified Successfully",
                                    data: user
                                })
                        })
                        .catch((error) => {
                            console.error(JSON.stringify(error));
                            res.status(400)
                                .json({
                                    message: "Not verified",
                                    data: resp
                                })
                        });
                    //console.log("Member added successfully:", user);

                } else {
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                }
            }
        );
    } else {
        resp.missingBody(res, "Missing Body");
    }
});


router.get('/getAllUser', (req, res) => {
    UserModel.find((err, doc) => {
        if (!err) {
            console.log(doc);
            console.log("getAllUser");
            res.status(200)
                .json({
                    message: "All User getting successfully",
                    data: doc
                })
        } else { console.log('Error in retreving :' + JSON.stringify(err, undefined, 2)) }

    })
});


router.put('/updateOneUser', (req, res) => {
    console.log(req.body);
    UserModel.updateOne({
        _id: req.body.id
    }, { $set: { "verified": req.body.data } }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            res.status(400)
                .json({
                    message: "User not Updated",
                    data: err
                })
        } else if (user) {
            if (req.body.data == 'yes') {
                console.log("yes");

                var content = 'Your account is verified by DocMachine, please use this emailId as your username'
            } else if (req.body.data == 'no') {
                console.log("no");
                var content = 'Your account is taken back by DocMachine'
            } else if (req.body.data == 'declined') {
                console.log("no");
                res.status(200)
                    .json({
                        message: "Account Declined successfully",
                        data: user
                    });
                return
            }
            console.log("shshjshjhjs");
            const html = EmailFormat.generalFormat({ html: content, heading: "User Approval" });
            const msg = {
                to: req.body.emailId, // Change to your recipient
                from: "admin@docmachine.in", // Change to your verified sender
                subject: "Account verification from DocMachine",
                text: "New User Registered",
                html: html
            };
            sgMail
                .send(msg)
                .then(() => {
                    console.log("message sent");
                    res.status(200)
                        .json({
                            message: "Updated successfully",
                            data: user
                        })
                })
                .catch((error) => {
                    console.log("message not sent");
                    console.error(error);
                    res.status(400)
                        .json({
                            message: "Not verified",
                            data: resp
                        })
                });


            console.log("Bene getting successfully:", user);
            //callback(null, user);
        } else {
            res.status(400)
                .json({
                    message: "error"
                })
        }

    });
});

router.post("/deleteUser", function(req, res) {
    console.log('1');
    if (req.body) {
        UserModel.deleteOne({ _id: req.body.id }, function(err, user) {
            console.log('1');
            if (!err) {
                console.log(user);
                console.log("DeleteUser");
                res.status(200)
                    .json({
                        message: "User Deleted Successfully",
                        data: user
                    })
            } else { console.log('Error in retreving :' + JSON.stringify(err, undefined, 2)) }

        })
    } else {
        resp.missingBody(res, "Missing Body");
    }
});

router.post("/uploadFile", async(req, res, next) => {
    try {
        const myFile = req.file;
        console.log(myFile);
        const imageUrl = await uploadImage(myFile);
        postDocument.addDocument({
            userId: 'skjsksksksk',
            docName: myFile.originalname,
            docSize: myFile.size,
            docType: myFile.mimetype
        }, (err, resp) => {
            if (err) {
                res
                    .status(400)
                    .json({
                        message: "Some error",
                        data: imageUrl
                    })
            } else if (res) {
                res
                    .status(200)
                    .json({
                        message: "Upload was successful",
                        data: imageUrl
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",
                        data: imageUrl
                    })
            }
        })

    } catch (error) {
        next(error)
    }
});


// router.get("/getProjectByProjectId", (req, res) => {
//   console.log("======inside getProjectsById=======");
//   if (req.query._id || req.user[0]) {
//     PostProjectCtrl.getProjectByProjectId(req.query, (err, project) => {
//       if (err) {
//         resp.errorResponse(
//           res,
//           err,
//           501,
//           "Error While Fetching Post Project List"
//         );
//       } else if (project) {
//         resp.successGetResponse(res, project, "Post Project List");
//       } else {
//         resp.noRecordsFound(res, "Unable to Fetch Post Project List");
//       }
//     });
//   } else {
//     resp.missingBody(res, "Missing/Invalid Body Parameters");
//   }
// });

// router.delete('/removeUploadedFile', AWS.deleteFile('file'),(req, res) => {
//   if (req.files.length > 0) {
//     console.log(req.files.length)
//       resp.successPostResponse(res, req.files, "File Deleted Successfully");
//   } else resp.missingBody(res, "Missing/Invalid Body Parameters");
// });

router.post("/deleteThumbPathFromS3", function(req, res, next) {
    var thumb = req.body.thumb;
    // console.log(req.body);
    // console.log("DELETE THUMBNAIL");
    // console.log(thumb)
    if (thumb) {
        var paramsDelete = { Bucket: "narendra123/projects/temp", Key: thumb.key };
        AWSS3 = new aws.S3({
            params: { Bucket: "narendra123/projects/temp" },
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
        });
        // console.log("PARAMSDELETE")
        // console.log(paramsDelete);
        AWSS3.deleteObject(paramsDelete, function(err, data) {
            if (!err) {
                if (data) {
                    console.log("RESPONSE OF THUMBNAIL");
                        // console.log(data);
                    res.status(200);
                    res.json(data);
                }
            } else if (err) {
                console.log(err);
            }
        });
    }
});


router.post("/documentSend", function(req, res) {
    // console.log("documentSend", req.body)
    // console.log("documentSend", req.body.byteArray)
    // req.body.bytePdf = atob(byteArray)
    if (req.body.emailId) {
        UserModel.findOne({
            emailId: req.body.emailId
        }, function(err, user) {
            console.log(user);
            console.log(err);
            if (err) {
                console.log("error while sending documents", err);
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            } else if (user) {
                AuthCtrl.documentSend(req.body.emailId, req.body.byteArray, function(err, docs) {
                    if (err) {
                        resp.errorResponse(
                            res,
                            err,
                            501,
                            "Internal Server Error, Please Try Again Later"
                        );
                    } else if (docs) {
                        resp.successPostResponse(
                            res,
                            null,
                            `Documents Successfully Send to ${req.body.emailId}`
                        );
                    } else {
                        resp.noRecordsFound(res, "Invalid Email Id");
                    }
                });
            } else {
                resp.errorResponse(
                    res,
                    err,
                    501,
                    "User Not found with this emailId"
                );
            }

        });
    } else {
        resp.missingBody(res, "Missing Body");
    }

});
