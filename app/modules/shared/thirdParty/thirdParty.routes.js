const express = require("express");
const router = express.Router();
module.exports = router;
const postThirdParty = require("./thirdParty.controller");

router.post("/post", async(req, res, next) => {
    console.log(req.body);
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    req.body.third.userId = req.user[0].companyId;
    console.log(req.body);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.third.date = `${day}-${month}-${year}`;
    postThirdParty.addThirdFile(req.body, (err, resp) => {
        console.log("hello");
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Some error",
            });
        } else if (resp) {
            console.log("inside resp");
            res.status(200).json({
                message: "Third added Successfully",
                data: resp,
            });
        } else {
            res.status(400).json({
                message: "Some error",
            });
        }
    });
});

router.post("/getSingleThird", async(req, res, next) => {
    console.log("inside ", req.user);
    console.log("inside ", req.body);
    postThirdParty.getSingleThird({
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
    postThirdParty.getThird({
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
    postThirdParty.updateThird(req.body.id, req.body.pipo, (err, resp) => {
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

// router.post("/getSinglePipo", async (req, res, next) => {
//     console.log("inside ", req.user);
//     console.log("inside ", req.body);
//     postThirdParty.getSinglePipo(
//         {
//             userId: req.body.id,
//         },
//         (err, resp) => {
//             if (err) {
//                 console.log(err);
//                 res.status(400).json({
//                     message: "Some error",
//                 });
//             } else if (resp) {
//                 console.log("inside resp");
//                 res.status(200).json({
//                     data: resp,
//                 });
//             } else {
//                 res.status(400).json({
//                     message: "Some error",
//                 });
//             }
//         }
//     );
// });


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
//     }
// })
// })
