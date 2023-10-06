const express = require("express");
const router = express.Router();
module.exports = router;
const uploadImage = require('../../../helpers/helper');
const uploadImage1 = require('../../../helpers/helper2');
const uploadImage2 = require('../../../helpers/helper3');
const uploadImage3 = require('../../../helpers/helper4');
const postDocument = require('../documents/document.controller');
const MasterModel = require('../masterFile/master.model');
const BoeModel = require('../boeFile/boe.model');
const irAdviceModel = require('../irAdvice/irAdvice.model');
const Master = require("../../projects/models/masterFile.model").MasterModel;
const Boe = require("../../projects/models/boefile.model").BoeModel;
const irAdvice = require("../../projects/models/irAdvice.model").irAdviceModel;


router.post("/uploadFile", async(req, res, next) => {

    console.log(req.headers);
    console.log(req.user);
    console.log(req.file);
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        console.log("sjsjsj");
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage.uploadImage(myFile);
            console.log("hshhshsh", result);
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    console.log("err", err);
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {
                    console.log("result", result);
                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];
                    console.log("dhdhhdhjdjksjk");
                    if (result[0].sbno) {
                        Master.findOne({ sbno: result[0].sbno, userId: result[0].userId }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    MasterModel.addMasterFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "Shipping bill added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //console.log("Error in Employee" + JSON.stringify(err, undefined, 2))
                                res
                                    .status(200)
                                    .json({
                                        message: "This file already uploaded",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })
                    } else if (result[0].boeNumber) {
                        Boe.findOne({
                            boeNumber: result[0].boeNumber,
                            userId: result[0].userId
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    BoeModel.addBoeFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "BOE added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //console.log("Error in Employee" + JSON.stringify(err, undefined, 2))
                                res
                                    .status(200)
                                    .json({
                                        message: "hjhjhjhjjh",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })


                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.post("/uploadFile1", async(req, res, next) => {
    console.log('2');
    console.log(req.headers);
    console.log(req.user);
    console.log(req.file);
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        console.log("sjsjsj");
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage1.uploadImage(myFile);
            console.log("hshhshsh", result);
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype
            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {
                    console.log("result", result);
                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];
                    console.log("dhdhhdhjdjksjk");
                    if (result[0].sbno) {
                        Master.findOne(

                            { sbno: result[0].sbno, userId: result[0].userId }, (err1, doc) => {
                                if (!err1) {
                                    if (doc) {
                                        res
                                            .status(200)
                                            .json({
                                                message: "This file already uploaded",
                                                data: result[0],
                                                publicUrl: result[1],
                                            })
                                    } else {
                                        MasterModel.addMasterFile(result[0], (er1, resp1) => {
                                            if (er1) {
                                                res
                                                    .status(400)
                                                    .json({
                                                        message: "Some error",
                                                        //data: imageUrl
                                                    })
                                            } else if (resp1) {
                                                res
                                                    .status(201)
                                                    .json({
                                                        message: "Shipping bill added successfully",
                                                        publicUrl: result[1],
                                                        data: resp1
                                                    })
                                            }

                                        })
                                    }
                                } else {
                                    //console.log("Error in Employee" + JSON.stringify(err, undefined, 2))
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })

                                }

                            })
                    } else if (result[0].boeNumber) {
                        Boe.findOne({
                            boeNumber: result[0].boeNumber,
                            userId: result[0].userId
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    BoeModel.addBoeFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some error",
                                                    //data: imageUrl
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "BOE added successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }

                                    })
                                }
                            } else {
                                //console.log("Error in Employee" + JSON.stringify(err, undefined, 2))
                                res
                                    .status(200)
                                    .json({
                                        message: "hjhjhjhjjh",
                                        data: result[0],
                                        publicUrl: result[1],
                                    })

                            }

                        })


                    }


                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.post("/uploadFile2", async(req, res, next) => {

    console.log(req.headers);
    console.log(req.user);
    console.log(req.file);
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        console.log("sjsjsj");
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage2.uploadImage(myFile);
            console.log("hshhshsh", result);
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype

            }, (err, resp) => {
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {
                    console.log("result", result);
                    result[0].userId = `${req.user[0].companyId}`;
                    result[0].doc = result[1];
                    console.log("dhdhhdhjdjksjk");
                    if (result[0].billNo) {
                        irAdvice.findOne({
                            billNo: result[0].billNo,
                            userId: result[0].userId,
                        }, (err1, doc) => {
                            if (!err1) {
                                if (doc) {
                                    res
                                        .status(200)
                                        .json({
                                            message: "This file already uploaded",
                                            data: result[0],
                                            publicUrl: result[1],
                                        })
                                } else {
                                    irAdviceModel.addIrAdviceFile(result[0], (er1, resp1) => {
                                        if (er1) {
                                            res
                                                .status(400)
                                                .json({
                                                    message: "Some Error",
                                                })
                                        } else if (resp1) {
                                            res
                                                .status(201)
                                                .json({
                                                    message: "FirexAdvice added Successfully",
                                                    publicUrl: result[1],
                                                    data: resp1
                                                })
                                        }
                                    })
                                }
                            } else {
                                res
                                    .status(200)
                                    .json({
                                        message: "SjSjSj",
                                        data: result[0],
                                        publicUrl: result[1]
                                    })
                            }
                        })
                    }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});

router.post("/uploadFile3", async(req, res, next) => {

    console.log(req.headers);
    console.log(req.user);
    console.log(req.file);
    var delayInMilliseconds = 1000 * 20;
    if (req.user) {
        console.log("sjsjsj");
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage3.uploadImage(myFile);
            // console.log("hshhshsh", result)
            postDocument.addDocument({
                userId: req.user[0].companyId,
                docName: name,
                docSize: size,
                docType: myFile.mimetype

            }, (err, resp) => {
                console.log('resp: ', resp);
                if (err) {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                } else if (res) {
                    // console.log("result", result)
                    result[0].userId = `${req.user[0].companyId}`;
                    // result[0].doc = result[1]
                    // console.log("dhdhhdhjdjksjk");

                    // ------ dummy ----------
                    res
                        .status(200)
                        .json({
                            message: "This file uploaded",
                            data: result,
                            // publicUrl: result[1],
                        })
                    // -----------------------
                    // if (result[0].billNo) {
                    //     irAdvice.findOne({
                    //         billNo: result[0].billNo,
                    //         userId: result[0].userId,
                    //     }, (err1, doc) => {
                    //         if (!err1) {
                    //             if (doc) {
                    //                 res
                    //                     .status(200)
                    //                     .json({
                    //                         message: "This file already uploaded",
                    //                         data: result[0],
                    //                         publicUrl: result[1],
                    //                     })
                    //             } else {
                    //                 irAdviceModel.addIrAdviceFile(result[0], (er1, resp1) => {
                    //                     if (er1) {
                    //                         res
                    //                             .status(400)
                    //                             .json({
                    //                                 message: "Some Error",
                    //                             })
                    //                     } else if (resp1) {
                    //                         res
                    //                             .status(201)
                    //                             .json({
                    //                                 message: "FirexAdvice added Successfully",
                    //                                 publicUrl: result[1],
                    //                                 data: resp1
                    //                             })
                    //                     }
                    //                 })
                    //             }
                    //         } else {
                    //             res
                    //                 .status(200)
                    //                 .json({
                    //                     message: "SjSjSj",
                    //                     data: result[0],
                    //                     publicUrl: result[1]
                    //                 })
                    //         }
                    //     })
                    // }

                } else {
                    res
                        .status(400)
                        .json({
                            message: "Some error",
                            //data: imageUrl
                        })
                }
            })

        } catch (error) {
            next(error)
        }
    } else {
        // res.unauthorized(res, "Unauthorized");
    }

});
