const express = require("express");
const router = express.Router();
module.exports = router;
const postOpinionReport = require("./opinionReport.controller");
const airwayBlCopyFile = require("../../projects/models/thirdParty.model");



router.post("/post", async(req, res, next) => {
    console.log("shailendra");
    console.log(req.body);

    console.log("inside ", req.user);
    console.log("inside ", req.body);
    req.body.opinionReport.userId = req.user[0].companyId;
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.opinionReport.date = `${day}-${month}-${year}`;
    postOpinionReport.addOpinionReportFile(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            console.log("inside resp");
            res.status(200).json({
                message: "OpinionReport added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleOpinionReport", async(req, res, next) => {
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    postOpinionReportNote.getSingleOpinionReport({
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
    postOpinionReport.getOpinionReport({
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
    postOpinionReport.updateOpinionReport(req.body.id, req.body.pipo, (err, resp) => {
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

// router.get("/get", async(req, res, next) => {
//     console.log("inside ", req.user);
//     console.log("inside route")
//     airwayBlCopyFile.find((err, rec) => {
//         console.log("inside rec query")
//         if (err) {
//             res.send("oops something went wrong")
//         } else {

//             for (let file of rec) {
//                 let newAtribute = {
//                         file: 'export'
//                     }
//                     // let fileObject = Object.assign(file, newAtribute)
//                     // return res.send(fileObject)
//                 airwayBlCopyFile.updateOne({
//                         _id: file._id,
//                     }, { $set: newAtribute },
//                     (errs, updatedDoc) => {
//                         if (errs) {
//                             console.log('err')
//                         } else {
//                             console.log(updatedDoc)
//                         }
//                     })

//             }
//             // res.json({
//             //     allRecords: rec[0]._id
//             // })
//         }
//     })
// })
