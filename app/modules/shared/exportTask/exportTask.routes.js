const express = require("express");
const router = express.Router();
module.exports = router;
const task = require("./exportTask.controller");

router.post("/post", async (req, res, next) => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    console.log("this is body ", req.body);
    req.body.task.date = `${day}-${month}-${year}`;
    req.body.task.userId = req.user[0].companyId;
    // req.body.task.fileType = req.body.task.fileType;
    // req.body.task.completed = req.body.fileType;
    console.log(req.body);
    task.addTaskFile(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            console.log("inside resp");
            res.status(200).json({
                message: "Pipo added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});


router.get("/get", async (req, res, next) => {
    console.log("inside ", req.user);
    task.getTask(
        {
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

router.post("/update", async (req, res, next) => {

    console.log('inside ', req.user);
    task.updateTask(
        req.body.id, req.body.task
        , (err, resp) => {
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

router.post("/getFromType", async (req, res, next) => {

    console.log('inside ', req.user);
    req.body.userId = req.user[0].companyId;
    task.getType(
        req.body
        , (err, resp) => {
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

router.post("/getOne", async (req, res, next) => {
    console.log("inside ", req.user);
    task.getOne(
        {
            id: req.body.id,
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



