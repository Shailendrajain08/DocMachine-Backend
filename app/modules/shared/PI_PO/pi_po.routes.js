const express = require("express");
const router = express.Router();
module.exports = router;
const postPipo = require("./pi_po.controller");
const fs = require("fs");
const hummus = require("hummus");
const memoryStreams = require("memory-streams");
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join("./", 'root-booking-369711-aaad9db4cbfe.json');
const storageConf = { keyFilename: serviceKey };
const storage = new Storage(storageConf);
const myBucket = storage.bucket('bharathexim-files');

router.post("/post", async(req, res, next) => {
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.pipo.purchasedate = `${day}-${month}-${year}`;

    console.log("inside ", req.user);
    console.log("inside ", req.body);
    req.body.pipo.userId = req.user[0].companyId;
    console.log(req.body);
    postPipo.addPipoFile(req.body, (err, resp) => {
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

router.post("/getSinglePipo", async(req, res, next) => {
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    postPipo.getSinglePipo(req.body.id,
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
    postPipo.getPipo({
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

    postPipo.updatePipo(req.body.id, req.body.pipo, (err, resp) => {
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

router.post("/updateSingle", async(req, res, next) => {
    console.log("inside ", req.user);
    postPipo.updateSinglePipo(req.body.id, req.body.file, req.body.doc, (err, resp) => {
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

router.post("/getSinglePipo", async(req, res, next) => {
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    postPipo.getSinglePipo(req.body.id,
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

router.post("/updateMany", async(req, res, next) => {
    console.log("inside ", req.body);
    postPipo.updateManyPipo(req.body.pipo, req.body.file, req.body.doc, req.body, req.user[0].companyId, (err, resp) => {
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

router.post("/updateMany1", async(req, res, next) => {
    postPipo.updateManyPipo1(req.body.pipo, req.body.file, (err, resp) => {
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

router.post("/getMany", async(req, res, next) => {
    console.log("inside ", req.user);
    postPipo.getManyPipo(req.body.pipo, req.user[0].companyId, (err, resp) => {
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

router.post("/getPipoByBene", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postPipo.getPipoByBene({
        beneName: req.body.bene,
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
// router.post("/update", async (req, res, next) => {
//   console.log("res.bjjody")
//   console.log(req.body)

//   postBoe.updateBoe(
//       req.body._id, req.body.master, (err, resp) => {
//         console.log("error here",err)
//         console.log("Result here",resp)
//         if (err) {
//           console.log(err)
//           res
//           .status(400)
//           .json({
//             message: "Some error",

//           })
//         } else if (resp) {
//           console.log("inside resp")
//           res.status(200)
//           .json({
//             message: "Upload was successful",
//             data: resp
//           })
//         } else {
//           res
//           .status(400)
//           .json({
//             message: "Some error",

//           })
//         }
//     })
// })

// router.post("/updateByBoe", async (req, res, next) => {
//   console.log("res.bjjody")
//   console.log(req.body)

//   postBoe.updateBoeByBoe(
//       req.body._id, req.body.master, (err, resp) => {
//         console.log("error here",err)
//         console.log("Result here",resp)
//         if (err) {
//           console.log(err)
//           res
//           .status(400)
//           .json({
//             message: "Some error",

//           })
//         } else if (resp) {
//           console.log("inside resp")
//           res.status(200)
//           .json({
//             message: "Upload was successful",
//             data: resp
//           })
//         } else {
//           res
//           .status(400)
//           .json({
//             message: "Some error",

//           })
//         }
//     })
// })

// router.post("/getBoeByBoe", async (req, res, next) => {
//   console.log("res.bjjody")
//   console.log(req.body)

//   postBoe.getBoeByBoe(
//     {
//        boeNumber:req.body.boeNumber,
//     }, (err, resp) => {
//     if (err) {
//       console.log(err)
//       res
//       .status(400)
//       .json({
//         message: "Some error",

//       })
//     } else if (resp) {
//       console.log("inside resp")
//       res.status(200)
//       .json({
//         message: "Upload was successful",
//         data: resp
//       })
//     } else {
//       res
//       .status(400)
//       .json({
//         message: "Some error",

//       })
//     }s
// })
// })

router.post("/mergePdf", async(req, res, next) => {
    const file = myBucket.file(req.body.filename);
    console.log("1254//////", file);
    file.download().then(function(data) {
        const contents = data[0];
        // you can use res.send(contents);
        console.log(contents);
        res.send(contents);
        // res.json({ contents: contents })
    })
});