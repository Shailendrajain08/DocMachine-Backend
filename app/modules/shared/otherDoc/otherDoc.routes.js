const express = require("express");
const router = express.Router();
module.exports = router;
const postOtherDoc = require("./otherDoc.controller");

router.post("/post", async(req, res, next) => {
    console.log("shailendra");
    console.log(req.body);

    console.log("inside ", req.user);
    console.log("inside ", req.body);
    req.body.otherDoc.userId = req.user[0].companyId;
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.otherDoc.otherDocDate = `${day}-${month}-${year}`;
    postOtherDoc.addOtherDocFile(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            console.log("inside resp");
            res.status(200).json({
                message: "OtherDoc added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleOtherDoc", async(req, res, next) => {
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    postOtherDoc.getSingleOtherDoc({
            userId: req.body.id,
        },
        (err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message: "Some error",
                });
            } else if (resp) {
                console.log("inside resp");
                res.status(200).json({
                    data: resp,
                });
            } else {
                res.status(400).json({
                    message: "Some error",
                });
            }
        }
    );
});

router.get("/get", async(req, res, next) => {
    console.log("inside ", req.user);
    postOtherDoc.getOtherDoc({
            userId: req.user[0].companyId,
        },
        (err, resp) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message: "Some error",
                });
            } else if (resp) {
                console.log("inside resp");
                res.status(200).json({
                    data: resp,
                });
            } else {
                res.status(400).json({
                    message: "Some error",
                });
            }
        }
    );
});

router.post("/update", async(req, res, next) => {
    console.log("inside ", req.user);
    postOtherDoc.updateOtherDoc(req.body.id, req.body.pipo, (err, resp) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            console.log("inside resp");
            res.status(200).json({
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});
