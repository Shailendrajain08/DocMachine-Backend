const express = require("express");
const router = express.Router();
module.exports = router;
const postEdpms = require("./edpms.controller");

// create EDPMS
router.post("/addEDPMS", async (req, res, next) => {
    req.body.userId = req.user[0].companyId;
    console.log('add: ', req.body);
    postEdpms.addEdpms(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res
                .status(400)
                .json({
                    message: "Some error",
                    error: err,
                })
        } else if (resp) {
            console.log("inside resp");
            res.status(200)
                .json({
                    message: "EDPMS added Successfully",
                    data: resp
                })
        } else {
            res
                .status(400)
                .json({
                    message: "Some error",

                })
        }
    });
});

// get EDPMS
router.get("/getEDPMS", async(req, res, next) => {
    console.log('inside ', req.user);
    postEdpms.getEdpms({
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
            console.log("inside resp");
            res.status(200)
                .json({
                    message: "EDPMS data sent successfully",
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

    postEdpms.updateEdpms(
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
                console.log("inside resp");
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

router.post("/updateByEdpms", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postEdpms.updateEdpmsByEdpms(
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
                console.log("inside resp");
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

router.get("/getEdpmsByEdpms", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postEdpms.getEdpmsByEdpms({
        sbNo: req.body.sbNo,
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
            console.log("inside resp");
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

router.get("/getEdpmsBysbNo", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postEdpms.getEdpmsBySbno({
        sbNo: req.body.sbNo,
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
            console.log("inside resp");
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
