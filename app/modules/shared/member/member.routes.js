const express = require("express");
const router = express.Router();
module.exports = router;
const postMember = require('../member/member.controller');
const uploadImage1 = require('../../../helpers/helper');
const sgMail = require('@sendgrid/mail');
const EmailTemplate = require("../../projects/model_helpers/email_template");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post("/post", async(req, res, next) => {
    console.log('inside ', req.user);
    console.log('inside ', req.body);
    req.body.member.teamId = req.user[0].companyId;
    console.log(req.body);
    postMember.addMember(req.body.member, req.user[0], (err, resp) => {
        console.log("hello");
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
                    message: "Member added Successfully",
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

router.post("/check", async(req, res, next) => {
    console.log("hshsjsjjs")


});


router.post("/get", async(req, res, next) => {
    console.log('inside ', req.user);
    postMember.getMember(

        req.user[0].companyId, (err, resp) => {
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


router.post("/uploadImage", async(req, res, next) => {
    console.log('inside uploadImage', req.body.fileType);
    console.log('inside upload image2', req.body);
    console.log("user", req.user);
    console.log("filr", req.file);
    console.log("fileType", req)
    let fileType = req.body.fileType;

    //console.log("head",req.headers)
    // console.log("body",req.body)
    const result = await uploadImage1.uploadImage1(req.file);
    var obj = {
        [fileType]: result
    };
    console.log("hshhshsh", result);
    if (result) {
        if (fileType) {
            res
                .status(200)
                .json({
                    message: "File Added",
                    data: obj

                })

        } else {
            res
                .status(200)
                .json({
                    message: "Image Added",
                    data: result

                })

        }
        console.log(result)

    } else {
        res
            .status(400)
            .json({
                message: "Some error",

            })
    }




});


// router.post("/getSingleBene", async (req, res, next) => {
//     console.log('inside ',req.user)
//     console.log('inside ',req.body)
//     postBene.getSingleBene(
//         {
//            userId:req.body.id,
//         }, (err, resp) => {
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

// router.post("/get", async (req, res, next) => {
//     console.log('inside ',req.user)
//     postBene.getBene(
//         {
//            userId:req.user[0]._id,
//         }, (err, resp) => {
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

// router.post("/update", async (req, res, next) => {

//     console.log('inside ',req.user)
//     postBene.updateBene(

//           req.body.id, req.body.bene
//         , (err, resp) => {
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