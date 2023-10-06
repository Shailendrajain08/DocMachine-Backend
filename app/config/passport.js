const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var mongojs = require('mongojs');
var db = mongojs(process.env.DB_URL, ['users', 'tempUsers']);
var ObjectId = require('mongodb').ObjectID;
const UserModel = require('../modules/user/user.model');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
//const LinkedinTokenStrategy = require('passport-linkedin-oauth2').Strategy
module.exports = function (passport) {
    var opts = {};

    // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
        console.log('User Authenticating:', jwtPayload);
        UserModel.findUser({ _id: jwtPayload._id }, function (err, user) {
            if (err) {
                var errMsg = {
                    message: 'Unauthorized User For Mission Possible',
                    err: err
                };
                return done(errMsg, false);
            } else if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });

    }));

    // Google OAuth Strategy for employer
    passport.use('employerGoogleToken', new GooglePlusTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken, 'accT');
        // console.log(refreshToken, 'refreT');
        // console.log(profile, 'prof');
        UserModel.findUser({ gid: profile.id }, function (err, doc) {
            if (err) {
                console.log("Error:", err);
                return done(err, false);
            } else if (doc) {
                return done(null, doc[0]);
            } else {
                UserModel.findUser({ emailId: profile.emails[0].value }, function (err, docs) {
                    if (err) {
                        console.log("Error:", err);
                        return done(err, false);
                    } else if (docs) {
                        const query = { emailId: profile.emails[0].value };
                        const googleUser = {
                            gid: profile.id
                        };
                        UserModel.findUserAndUpdate(query, googleUser, (err, data) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (data) {
                                return done(null, data);
                            } else {
                                return done(null, false);
                            }
                        });
                    } else {
                        const googleUser = {
                            emailId: profile.emails[0].value,
                            gid: profile.id,
                            iniReg: "Google",
                            role: 'Employer'
                        };
                        UserModel.addUser(googleUser, (err, resp) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (resp) {
                                return done(null, resp);
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                });
            }
        });
    }));
    // Google OAuth Strategy for Freelancer
    passport.use('freelancerGoogleToken', new GooglePlusTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken, 'accT');
        // console.log(refreshToken, 'refreT');
        // console.log(profile, 'prof');
        UserModel.findUser({ gid: profile.id }, function (err, doc) {
            if (err) {
                console.log("Error:", err);
                return done(err, false);
            } else if (doc) {
                return done(null, doc[0]);
            } else {
                UserModel.findUser({ emailId: profile.emails[0].value }, function (err, docs) {
                    if (err) {
                        console.log("Error:", err);
                        return done(err, false);
                    } else if (docs) {
                        const query = { emailId: profile.emails[0].value };
                        const googleUser = {
                            gid: profile.id
                        };
                        UserModel.findUserAndUpdate(query, googleUser, (err, data) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (data) {
                                return done(null, data);
                            } else {
                                return done(null, false);
                            }
                        });
                    } else {
                        const googleUser = {
                            emailId: profile.emails[0].value,
                            gid: profile.id,
                            iniReg: "Google",
                            role: 'Freelancer'
                        };
                        UserModel.addUser(googleUser, (err, resp) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (resp) {
                                return done(null, resp);
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                });
            }
        });
    }));

    // Facebook OAuth Strategy for employer
    passport.use('employerFacebookToken', new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, 'accT');
        console.log(refreshToken, 'refreT');
        console.log(profile, 'prof');
        UserModel.findUser({ fid: profile.id }, function (err, doc) {
            if (err) {
                console.log("Error:", err);
                return done(err, false);
            } else if (doc) {
                return done(null, doc);
            } else {
                UserModel.findUser({ emailId: profile.emails[0].value }, function (err, docs) {
                    if (err) {
                        console.log("Error:", err);
                        return done(err, false);
                    } else if (docs) {
                        const query = { emailId: profile.emails[0].value };
                        const facebookUser = {
                            fid: profile.id
                        };
                        UserModel.findUserAndUpdate(query, facebookUser, (err, data) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (data) {
                                return done(null, data);
                            } else {
                                return done(null, false);
                            }
                        });
                    } else {
                        const facebookUser = {
                            emailId: profile.emails[0].value,
                            fid: profile.id,
                            iniReg: "Facebook",
                            role: 'Employer',
                            first_name: profile.name['givenName'],
                            last_name: profile.name['familyName']
                        };
                        UserModel.addUser(facebookUser, (err, resp) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (resp) {
                                return done(null, resp);
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                });
            }
        });
    }));

    // Facebook OAuth Strategy for freelancer
    passport.use('freelancerFacebookToken', new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, 'accT');
        console.log(refreshToken, 'refreT');
        console.log(profile, 'prof');
        UserModel.findUser({ fid: profile.id }, function (err, doc) {
            if (err) {
                console.log("Error:", err);
                return done(err, false);
            } else if (doc) {
                return done(null, doc);
            } else {
                UserModel.findUser({ emailId: profile.emails[0].value }, function (err, docs) {
                    if (err) {
                        console.log("Error:", err);
                        return done(err, false);
                    } else if (docs) {
                        const query = { emailId: profile.emails[0].value };
                        const facebookUser = {
                            fid: profile.id
                        };
                        UserModel.findUserAndUpdate(query, facebookUser, (err, data) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (data) {
                                return done(null, data);
                            } else {
                                return done(null, false);
                            }
                        });
                    } else {
                        const facebookUser = {
                            emailId: profile.emails[0].value,
                            fid: profile.id,
                            iniReg: "Facebook",
                            role: 'Freelancer',
                            first_name: profile.name['givenName'],
                            last_name: profile.name['familyName']
                        };
                        UserModel.addUser(facebookUser, (err, resp) => {
                            if (err) {
                                console.log("Error:", err);
                                return done(err, false);
                            } else if (resp) {
                                return done(null, resp);
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                });
            }
        });
    }));

    // Linkedin OAuth Strategy for Company
    // passport.use('freelancerLinkedinToken', new LinkedinTokenStrategy({
    //     clientID: '812woqdga70zvd',
    //     clientSecret: 'SVhIznVMlc709xmf',
    //     callbackURL: 'https://beta.wrked.com/linkedinauth',
    //     scope: ['r_emailaddress', 'r_basicprofile'],
    //     // scope: ['r_emailaddress', 'r_basicprofile'],
    //     state: true
    // }, async (accessToken, refreshToken, profile, done) => {
    //     console.log(accessToken, 'accT');
    //     console.log(refreshToken, 'refreT');
    //     console.log(profile, 'prof');
    //     UserModel.findUser({ fid: profile.id }, function (err, doc) {
    //         if (err) {
    //             console.log("Error:", err);
    //             return done(err, false);
    //         } else if (doc) {
    //             return done(null, doc);
    //         } else {
    //             UserModel.findUser({ emailId: profile.emails[0].value }, function (err, docs) {
    //                 if (err) {
    //                     console.log("Error:", err);
    //                     return done(err, false);
    //                 } else if (docs) {
    //                     const query = { emailId: profile.emails[0].value }
    //                     const facebookUser = {
    //                         fid: profile.id
    //                     }
    //                     UserModel.findUserAndUpdate(query, facebookUser, (err, data) => {
    //                         if (err) {
    //                             console.log("Error:", err);
    //                             return done(err, false);
    //                         } else if (data) {
    //                             return done(null, data);
    //                         } else {
    //                             return done(null, false);
    //                         }
    //                     });
    //                 } else {
    //                     const facebookUser = {
    //                         emailId: profile.emails[0].value,
    //                         fid: profile.id,
    //                         iniReg: "Facebook",
    //                         role: 'Freelancer',
    //                         first_name: profile.name['givenName'],
    //                         last_name: profile.name['familyName']
    //                     }
    //                     UserModel.addUser(facebookUser, (err, resp) => {
    //                         if (err) {
    //                             console.log("Error:", err);
    //                             return done(err, false);
    //                         } else if (resp) {
    //                             return done(null, resp);
    //                         } else {
    //                             return done(null, false);
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }));
    // passport.use('freelancerLinkedinToken',new LinkedinTokenStrategy({
    //     clientID: '812woqdga70zvd',
    //     clientSecret:'SVhIznVMlc709xmf',
    //     callbackURL: "https://beta.wrked.com/linkedinauth",
    //     scope: ['r_emailaddress', 'r_basicprofile'],
    //     state: true
    //   }, function(accessToken, refreshToken, profile, done) {
    //     // asynchronous verification, for effect...
    //     process.nextTick(function () {
    //       // To keep the example simple, the user's LinkedIn profile is returned to
    //       // represent the logged-in user. In a typical application, you would want
    //       // to associate the LinkedIn account with a user record in your database,
    //       // and return that user instead.
    //       return done(null, profile);
    //     });
    //   }))
};
