const express = require("express");
const router = express.Router();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const postUser = require("../../projects/models/users.model").UserModel;
module.exports = router;


router.post("/verify", async (req, res, next) => {
    console.log(req.body);
    console.log("inside ", req.user);
    console.log("inside ", req.body.data);
    //req.body.third.userId = req.user[0]._id;
    console.log(req.user[0].otpDetails.tempSecret);
    let isVerified = speakeasy.totp.verify({
        secret: req.user[0].otpDetails.tempSecret,
        encoding: 'base32',
        token: req.body.data
    });

    if (isVerified) {
        console.log(`DEBUG: TFA is verified to be enabled`);
        postUser.updateOne(
            {
                _id: req.user[0]._id
            },
            { $set: { "otpDone": 'yes' } }, function (err, user) {
                console.log(user);
                if (err) {
                    console.log("error while adding product:", err);
                    callback(err, null);
                } else if (user) {

                    console.log("Verified successfully", user);
                    return res.send({
                        "status": 200,
                        "message": "Two-factor Auth is enabled successfully"
                    });
                } else {
                    callback(null, null);
                }

            });
        //commons.userObject.tfa.secret = commons.userObject.tfa.tempSecret;

    }
    else {
        console.log(`ERROR: TFA is verified to be wrong`);

        return res.send({
            "status": 403,
            "message": "Invalid Auth Code, verification failed. Please verify the system Date and Time"
        });
    }
});

router.post("/delete", async (req, res, next) => {
    console.log(req.body);
    console.log("inside ", req.user);
    console.log("inside ", req.body.data);
    //req.body.third.userId = req.user[0]._id;
    //console.log(req.user[0].otpDetails.tempSecret);
    postUser.updateOne(
        {
            _id: req.user[0]._id
        },
        { $set: { "otpDone": 'no' } }, function (err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                return res.send({
                    "status": 402,
                    "message": "Not removed"
                });
                //callback(err, null);
            } else if (user) {

                console.log("Verified successfully", user);
                return res.send({
                    "status": 200,
                    "message": "Two-factor Auth is removed successfully"
                });
            } else {
                callback(null, null);
            }

        });
});
