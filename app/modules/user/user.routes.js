const express = require("express");
const router = express.Router();
const misc = require("../../helpers/misc");
const resp = require("../../helpers/responseHelpers");
const UserCtrl = require("./user.controller");
const AWS = require("../../helpers/aws-S3");
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const UserModel = require("./user.model");
const jwt = require("jsonwebtoken");
const { request } = require("../../config");
const SECRET = process.env.SECRET;

module.exports = router;

// router.post('/profile', (req, res) => {
//     console.log("====inside post profile======");
//     console.log(req.body);
//     misc.checkUser(req).then(
//         (user) => {
//             misc.checkProps(req, ["body"], "missing Parameters").then(
//                 (data) => {
//                     UserCtrl.createProfile(user, req.body).then(
//                         (data) => resp.successPostResponse(res, data),
//                         (err) => resp.errorResponse(res, err)
//                     )
//                 },
//                 (err) => {
//                     resp.errorResponse(res, err);
//                 }
//             )
//         }
//     )
// });

// router.put('/updateUser', (req, res) => {
//     if (req.user && req.body.updatedData) {
//         const query = {};
//         query['emailId'] = req.user[0].emailId;
//         const dataToBeUpdated = req.body.updatedData
//         delete dataToBeUpdated._id
//         UserCtrl.updateUser(query, dataToBeUpdated, function (err, docs) {
//             if (err) {
//                 resp.errorResponse(res);
//             } else if (docs) {
//                 resp.successPostResponse(res, docs, 'User Data updated successfully');
//             } else {
//                 resp.noRecordsFound(res, 'Invalid Email Id');
//             }
//         });
//     } else {
//         resp.missingBody(res, 'Missing parameters');
//     }
// })

// router.put('/profile', (req, res) => {
//     console.log("=====inside put profile=======")
//     //console.log(req.body);
//     console.log(req.body.profileDetails.category[0]);
//     if (req.user && req.body.profileDetails) {
//         //console.log("=========1=========");
//         const query = {};
//         query['emailId'] = req.user[0].emailId;
//         query['id'] = req.user[0].id;
//         //console.log(query);
//         UserCtrl.updateUserData(query, req.body.profileDetails, function (err, docs) {
//             // console.log("======docs=====");
//             // console.log(docs);
//             if (err) {
//                 //console.log("=======err=====");
//                 resp.errorResponse(res);
//             } else if (docs) {
//                 //console.log("========docs=======");
//                 resp.successPostResponse(res, docs, 'User Data updated successfully');
//             } else {
//                 //console.log("==========else=========");
//                 resp.noRecordsFound(res, 'Invalid Email Id');
//             }
//         });
//     } else {
//         resp.missingBody(res, 'Missing parameters');
//     }
// });

router.get("/profile", (req, res) => {
  console.log("asdkjdkjadbkajdkajdbkjdkjdbakjdbkjbkjb");
  misc.checkUser(req, res).then((user) => {
    UserCtrl.getProfile(user).then(
      (data) => resp.successGetResponse(res, data),
      (err) => resp.errorResponse(res, err)
    );
  });
});

// router.post('/updatepsw', function (req, res) {
//     console.log("data",req.user);
//     console.log(req.body.password);
//     // if (req.user) {
//     //     if (req.body.data.password && req.query.emailId) {
//     //         UserCtrl.resetpsw(req.query.emailId, req.body.data, function (err, docs) {
//     //             if (err) {
//     //                 resp.errorResponse(res);
//     //             } else if (docs) {
//     //                 resp.successPostResponse(res, docs, 'Password changed successfully, Please login with new Password');
//     //             } else {
//     //                 resp.noRecordsFound(res, 'Invalid Email Id');
//     //             }
//     //         });
//     //     } else {
//     //         resp.missingBody(res, 'Missing parameters');
//     //     }
//     // } else {
//     //     resp.unauthorized(res, "Unauthorized");
//     // }

// });

// router.put('/emailverification', function (req, res) {
//     if (req.user) {
//         const emailId = req.user[0].emailId;
//         const emailIdVerified = req.user[0].emailIdVerified;
//         UserCtrl.verifyEmail(emailId, emailIdVerified, function (err, docs) {
//             if (err) {
//                 resp.errorResponse(res);
//             } else if (docs) {
//                 resp.successPostResponse(res, 'Email Id successfully verified');
//             } else {
//                 resp.noRecordsFound(res, 'No Email Id  Found');
//             }
//         })
//     } else {
//         resp.missingBody(res, 'Missing Body');
//     }
// })

// router.post('/uploadImage', AWS.imageUpload.array('file', 1), (req, res) => {
//     console.log("inside the the upload the upload image");
//     console.log(res);
//     console.log("outside the the response");
//     console.log(req);
//     if (req.user && req.files.length > 0) {
//         resp.successPostResponse(res, req.files[0], "Image Uploaded successfully");
//     } else resp.missingBody(res, "Missing/Invalid Body Parameters");
// });

// router.get('/getMe/:token', function(req, res, next) {
//     try {
//         const user = jwt.verify(req.params.token, SECRET );
//         UserModel.getProfileDetailsById({_id: user._id}).then((dbUser) => {
//             if (dbUser) {
//                 res.status(200);
//                 res.json(dbUser);
//             } else {
//                 res.json('Invalid Token');
//             }
//         }).catch((err) => {
//             next(err);
//         });
//     } catch(err) {
//         res.json(err);
//     }
//     // try {
//     //     var token = jwt.verify(req.params.token, SECRET);
//     //     console.log(token.data.user._id);
//     //     UserModel.findUser(token.data.user._id, function (err, dbUser) {
//     //         if (err) {
//     //             next(err);
//     //         } else {
//     //             if (dbUser) {
//     //                 res.status(200);
//     //                 res.json(dbUser);
//     //             } else {
//     //                 res.json('Invalid Token');
//     //             }
//     //         }
//     //     })
//     // } catch(err) {
//     //     res.json({success: false});
//     // }
// });
