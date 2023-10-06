const bcrypt = require('bcryptjs');
const UserModel = require("../user/user.model");
const validators = require("../../helpers/validators");
const EmailTemplate = require("../projects/model_helpers/email_template");
const EmailTemplates = require('../mails/mailhelper/email-store/email-templates');
const Email = require('../../helpers/mail');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const postUser = require("../projects/models/users.model").UserModel;

function signUpUser(data, callback) {
    console.log("inside signup user");
    console.log(data);
    console.log(callback);
    validators.hashPassword(data.password, (err, hash) => {
        if (err) {
            callback(err, null);
        } else if (hash) {
            data.password = hash;
            data.otpDone = 'no';
            data.termsAndCondition = true;
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            data.date = `${day}/${month}/${year}`;
            UserModel.addUser(data, (err, res) => {
                console.log("USER model");
                console.log(res);
                if (err) {
                    callback(err, null);
                } else if (res) {
                    validators.generateJWTToken(res._id, (err, token) => {
                        if (err) {
                            callback(err, null);
                        } else if (res) {
                            console.log(res);
                            // ********** Post sign up activation **************
                            const activationMailObj = { user: { first_name: data.first_name, last_name: data.last_name }, host: data.origin, userToken: token, to: [{ 'email': data.emailId, 'name': data.first_name + ' ' + data.last_name, 'type': 'to' }], heading: 'Welcome !' };
                            // Function Name: mailObj

                            // ********** super admin email notify on new registration from same company **************
                            const mailObj = { newUser: { first_name: data.first_name, last_name: data.last_name, email: data.emailId }, host: data.origin, to: [{ 'email': 'admin@wrked.com', 'name': 'wrked', 'type': 'to' }, { 'email': 'eswervarma@uipep.com', 'name': 'wrked', 'type': 'cc' }], heading: 'New User Registration' };
                            // Function Name: toAdminNewUser
                            console.log(JSON.stringify(activationMailObj));
                            callback(null, token, res);
                            // // Function
                            // EmailTemplates.activationMail(activationMailObj, (err, response) => {
                            //   console.log(err, response, " Something happened")
                            //   if (err) {
                            //     callback(err, null);
                            //   } else {
                            //     console.log(JSON.stringify(mailObj))
                            //     EmailTemplates.toWrkedAdminNewUser(mailObj, (err, response) => {
                            //       console.log(err, response, " Something happened 2")
                            //       if (err) {
                            //         callback(err, null);
                            //       } else {
                            //         callback(null, token);
                            //       }
                            //     });
                            //   }
                            // });

                        } else {
                            callback(null, null);
                        }
                    });
                } else {
                    callback(null, null)
                }
            });
        } else {
            callback(null, null);
        }
    });
}

function contact(data, callback) {
    console.log("Inside the contact controller");
    console.log(data);
    console.log("outside the contact controller");
    const mailData = {
        from: data.contactData.EmailId,
        to: 'narendra@uipep.com',
        subject: 'From Wrked.com',
        text: `${data.contactData.MobileNo} <${data.contactData.EmailId}> \n${data.contactData.text}`,
    };
    console.log("testing of Email Data");
    console.log(mailData);
    Email.sendMail(mailData, function(error, info) {
        console.log("inside the mail transporter mail");
        console.log(info);
        console.log("info");
        console.log(error);
        // console.log(error, info);
        if (error) {
            console.log('error for the transporter mail');
            next(error, null);
        } else {
            console.log("inside the else condition");
            next(null, info.response);
        }
    });
}

function capitaliseFirstLetter(data) {
    console.log(data);
    data['fullName'] = data.fullName.charAt(0).toUpperCase() + data.fullName.slice(1);
    console.log(data);
    return data;
}

function socialLogin(user, callback) {
    validators.generateJWTToken(user._id, callback);
}

function userUpdate(user, data, callback) {
    UserModel.findUserAndUpdate(user.emailId, data, (err, res) => {
        if (err) {
            callback(err, null);

        } else if (res) {
            validators.generateJWTToken(user._id, callback);
        } else {
            callback(null, null);
        }
    })
}

function userLogin(authString, mode_user_reg, callback) {
    console.log(authString);
    validators.decodeAuthString(authString, (email, password) => {
        console.log(email);
        console.log(password);
        if (email && password) {
            UserModel.login({ emailId: email }, (err, res) => {
                console.log("USER MODEL");
                console.log(res);
                if (err) {
                    callback(err, null);
                } else if (res[0].password) {
                    if (mode_user_reg === 'Google' || mode_user_reg === 'Facebook') {
                        return callback({ error: 'wrong mode of login' }, null);
                    } else {
                        bcrypt.compare(password, res[0].password, (err, same) => {
                            console.log('-----------------------------------');
                            console.log(password, res[0].password, same);
                            console.log('-----------------------------------');
                            if (err) {
                                callback(err, null);
                            } else if (same) {
                                console.log('11161717171717');
                                console.log(res);
                                if (res[0].otpDone == 'no') {
                                    const secret = speakeasy.generateSecret({
                                        length: 10,
                                        name: res[0].fullName,
                                        issuer: 'DocMachine'
                                    });
                                    var url = speakeasy.otpauthURL({
                                        secret: secret.base32,
                                        label: res[0].fullName,
                                        issuer: 'DocMachine',
                                        encoding: 'base32'
                                    });
                                    QRCode.toDataURL(url, (err, dataURL) => {
                                        let data = {
                                            secret: '',
                                            tempSecret: secret.base32,
                                            dataURL,
                                            tfaURL: url
                                        };
                                        postUser.updateOne({
                                            _id: res[0]._id
                                        }, { $set: { "otpDetails": data } }, function(err, user) {
                                            console.log(user);
                                            if (err) {
                                                console.log("error while adding product:", err);
                                                callback(err, null);
                                            } else if (user) {
                                                validators.generateJWTToken(res[0]._id, (err, token) => {
                                                    callback(null, {
                                                        token: token,
                                                        role: res[0].role,
                                                        message: 'TFA Auth needs to be verified',
                                                        tempSecret: secret.base32,
                                                        dataURL,
                                                        tfaURL: secret.otpauth_url
                                                    });
                                                });
                                                console.log("Bene getting successfully:", user);
                                                //callback(null, user);
                                            } else {
                                                callback(null, null);
                                            }

                                        });

                                    });
                                } else if (res[0].otpDone == 'yes') {
                                    validators.generateJWTToken(res[0]._id, (err, token) => {
                                        callback(null, {
                                            token: token,
                                            role: res[0].role
                                        });
                                    });
                                } else {
                                    const secret = speakeasy.generateSecret({
                                        length: 10,
                                        name: res[0].fullName,
                                        issuer: 'DocMachine'
                                    });
                                    var url = speakeasy.otpauthURL({
                                        secret: secret.base32,
                                        label: res[0].fullName,
                                        issuer: 'DocMachine',
                                        encoding: 'base32'
                                    });
                                    QRCode.toDataURL(url, (err, dataURL) => {
                                        let data = {
                                            secret: '',
                                            tempSecret: secret.base32,
                                            dataURL,
                                            tfaURL: url
                                        };
                                        postUser.updateOne({
                                            _id: res[0]._id
                                        }, { $set: { "otpDetails": data } }, function(err, user) {
                                            console.log(user);
                                            if (err) {
                                                console.log("error while adding product:", err);
                                                callback(err, null);
                                            } else if (user) {
                                                validators.generateJWTToken(res[0]._id, (err, token) => {
                                                    callback(null, {
                                                        token: token,
                                                        role: res[0].role,
                                                        message: 'TFA Auth needs to be verified',
                                                        tempSecret: secret.base32,
                                                        dataURL,
                                                        tfaURL: secret.otpauth_url
                                                    });
                                                });
                                                console.log("Bene getting successfully:", user);
                                                //callback(null, user);
                                            } else {
                                                callback(null, null);
                                            }

                                        });

                                    });
                                }

                            } else {
                                callback(null, null);
                            }
                        });
                    }
                } else {
                    return callback({ name: 'wrong mode of login' }, null);
                    // callback(null, null);
                }
            });
        } else {
            callback(null, null);
        }
    });
}

// function checkUserRegType(res){
//   if
// }


function verifyEmail(emailId, emailIdVerified, callback) {
    UserModel.findUserAndUpdate({ emailId }, { emailIdVerified }, function(err, res) {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function forgotpsw(emailId, callback) {
    EmailTemplate.sendForgotEmail({ emailId }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function documentSend(emailId, byteArray, callback) {
    EmailTemplate.sendDocuments({ emailId, byteArray }, (err, res) => {
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}
module.exports = {
    signUpUser: signUpUser,
    userLogin: userLogin,
    verifyEmail: verifyEmail,
    forgotpsw: forgotpsw,
    // updatePassword: updatePassword,
    socialLogin: socialLogin,
    userUpdate: userUpdate,
    contact: contact,
    capitaliseFirstLetter: capitaliseFirstLetter,
    documentSend: documentSend
};
