const express = require("express");
const router = express.Router();
module.exports = router;
const uploadImage2 = require('../../../helpers/helper3');
const postDocument = require('../documents/document.controller');
const irAdviceModel = require('../irAdvice/irAdvice.model');
const postIrAdvice = require('../irAdvice/irAdvice.controller');


router.post("/uploadFile", async(req, res, next) => {
    console.log(req.user);
    console.log(req.file);

    if (true) {
        console.log("sjsjsj");
        try {
            const myFile = req.file;
            const name = myFile.originalname.replace(/ /g, "_");
            const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
            const result = await uploadImage2(myFile);
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
                    // console.log("result",res)
                    // console.log("res1111")
                    result.userId = `${req.user[0].companyId}`;
                    irAdviceModel.addIrAdviceFile(result, (er1, resp1) => {
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
                                    message: "Success!!!",
                                    data: resp1
                                })
                        }

                    })
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

router.get("/get", async(req, res, next) => {
    console.log('inside ', req.user);
    postIrAdvice.getIrAdvice({
        userId: req.user[0].companyId,
    }, (err, resp) => {
        if (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            // console.log("inside resp");
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })

});

router.post("/update", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.master.irdate = `${day}-${month}-${year}`;
    postIrAdvice.updateIrAdvice(
        req.body._id, req.body.master, (err, resp) => {
            console.log("error here", err);
            console.log("Result here", resp);
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                // console.log("inside resp");
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/updateByIrAdvice", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postIrAdvice.updateIrAdviceByIrAdvice(
        req.body._id, req.body.master, (err, resp) => {
            console.log("error here", err);
            console.log("Result here", resp);
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                // console.log("inside resp");
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});

router.post("/getIrAdviceByIrAdvice", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postIrAdvice.getIrAdviceByIrAdvice({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            // console.log("inside resp");
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});

router.post("/getIrAdviceByBillNo", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postIrAdvice.getIrAdviceByBillNo({
        billNo: req.body.billNo,
        userId: req.user[0].companyId
    }, (err, resp) => {
        if (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        } else if (resp) {
            // console.log("inside resp");
            res.status(200)
                .json({
                    message: "Upload was successful",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    })
});


router.post("/updateIrAdvice", async(req, res, next) => {
    console.log("res.bjjody");
    console.log("150", req.user);
        // console.log("151", req.user[0]._id);
    console.log("152", req.user[0].companyId);
    postIrAdvice.updateIrAdviceByIr(
        req.body._id, req.body.master, req.user[0].companyId, (err, resp) => {
            console.log("sucess here", req.body.master);
            console.log("error here", err);
            console.log("Result here", resp);
            if (err) {
                console.log(err);
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            } else if (resp) {
                // console.log("inside resp");
                res.status(200)
                    .json({
                        message: "Upload was successful",
                        data: resp
                    })
            } else {
                res
                    .status(400)
                    .json({
                        message: "Some error",

                    })
            }
        })
});
