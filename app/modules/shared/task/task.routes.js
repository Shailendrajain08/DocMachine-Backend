const router = require("express").Router();
const Task = require("../../projects/models/task.model");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/getPipo", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, file: "advance" });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getBoeTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ boeNumber: req.body.boeNumber, userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getSbTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ sbno: req.body.sbno, userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, file: req.body.file });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getBcTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ userId: req.user[0].companyId, file: req.body.file });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getCaTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ ca: true, caRequest: 'sent' });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getPipoCaTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, ca: true });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getPipoInwardTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ pi_poNo: req.body.pi_poNo, userId: req.user[0].companyId, rbaPurpose: "yes" });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/getAllTask", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ userId: req.user[0].companyId });
        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});


router.post("/getOne", async(req, res) => {
    console.log(req.body);
    try {
        const result = await Task.find({ _id: req.body.id });

        res.status(200).json({
            message: "Task succeddfully loaded",
            task: result,
        });
    } catch (err) {
        res.status(400).json({
            message: "Error in fetching the tasks",
            Error: err,
        });
    }
});

router.post("/post", async(req, res, next) => {
    console.log("KJBKJBKJBKJBKJBKJBKJ");
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let newTask = new Task({
        userId: req.user[0].companyId,
        pi_poNo: req.body.pi_poNo,
        pipoDetail: req.body.pipoDetail,
        beneDetail: req.body.beneDetail,
        completed: req.body.completed,
        url1: req.body.url1,
        url2: req.body.url2,
        boeNumber: req.body.boeNumber,
        sbno: req.body.sbno,
        sbDetails: req.body.sbDetails,
        file: req.body.file,
        boeDetails: req.body.boeDetails,
        bank: req.body.bank,
        rbaPurpose: req.body.rbaPurpose,
        ca: req.body.ca,

        caDone: req.body.caDone,
        caUrl: req.body.caUrl,
        email: req.user[0].emailId,
        caRequest: req.body.caRequest,
        transactionDate: `${day}/${month}/${year}`,
    });
    //console.log(newTask)

    newTask.save((err, doc) => {
        if (!err) {
            console.log("added", doc);
            res.status(200).json({
                message: "Task saved success",
            });
        } else {
            res.status(400).json({
                message: "Error saving the Task",
            });
        }
    });
});

router.post("/complete", async(req, res) => {
    console.log("BODY", req.body.task);
    Task.updateOne({
            _id: req.body._id,
        }, { $set: req.body.task },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                res.status(400).json({
                    message: "Fail",
                });
            } else if (user) {
                //console.log("Task successfully:", user);
                res.status(200).json({
                    message: "Success",
                });
            } else {
                res.status(400).json({
                    message: "Fail",
                });
            }
        }
    );
});

router.post("/taskEmail", async(req, res) => {
    //console.log("BODY", req.body.task);
    console.log("BODY", req.body.task.email);
    console.log("BODY", req.body.task.file);
    const msg = {
        to: req.body.task.email, // Change to your recipient
        from: "admin@docmachine.in", // Change to your verified sender
        subject: `Request Letter Sent ${req.body.task.file}`,
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

router.post("/testEmail2", async(req, res) => {
    console.log(req)
});

router.post("/exportEmail", async(req, res) => {
    //console.log("BODY", req.body.task);
    console.log("BODY", req.body.task.email);
    console.log("BODY", req.body.task.file);
    const msg = {
        to: req.user[0].emailId, // Change to your recipient
        from: "admin@docmachine.in", // Change to your verified sender
        subject: `Bank Reference number ${req.body.task.file}`,
        text: `Message from ${req.user[0].fullName}`
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

router.post("/pdfMail", async(req, res) => {
    //console.log("BODY", req.body.task);
    console.log("BODY", req.body.task.email);
    console.log("BODY", req.body.task.file);
    const msg = {
        to: req.body.task.email, // Change to your recipient
        from: "admin@docmachine.in", // Change to your verified sender
        subject: `Request Letter Sent ${req.body.task.file}`,
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    sgMail
        .send(msg)
        .then(() => {
            res.status(200).json({
                message: "Email Sent",
            });
        })
        .catch((error) => {
            console.error(error);
        });

});

module.exports = router;
