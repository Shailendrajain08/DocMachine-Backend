const express = require("express");
const router = express.Router();
module.exports = router;
const uploadImage = require('../../../helpers/helper2');
const postDocument = require('../documents/document.controller');
const BoeModel = require('../boeFile/boe.model');
const postBoe = require('../boeFile/boe.controller');


router.post("/uploadFile", async (req, res, next) => {
  console.log(req.user);
  console.log(req.file);


  if (true) {
    console.log("sjsjsj");
    try {
      const myFile = req.file;
      const name = myFile.originalname.replace(/ /g, "_");
      const size = (myFile.size / 1024).toFixed(2).toString() + "KB";
      const result = await uploadImage(myFile);
      postDocument.addDocument(
        {
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
            BoeModel.addBoeFile(result, (er1, resp1) => {
              if (er1) {
                res
                  .status(400)
                  .json({
                    message: "Some error",
                    //data: imageUrl
                  })
              }
              else if (resp1) {
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
  }
  else {
    // res.unauthorized(res, "Unauthorized");
  }

});

router.get("/get", async (req, res, next) => {
  console.log('inside ', req.user);
  postBoe.getBoe(
    {
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

router.post("/update", async (req, res, next) => {
  console.log("res.bjjody");
  console.log(req.body);

  postBoe.updateBoe(
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

router.post("/updateByBoe", async (req, res, next) => {
  console.log("res.bjjody");
  console.log(req.body);

  postBoe.updateBoeByBoe(
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

router.post("/getBoeByBoe", async (req, res, next) => {
  console.log("res.bjjody");
  console.log(req.body);

  postBoe.getBoeByBoe(
    {
      boeNumber: req.body.boeNumber,
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

router.post("/getBoeByBene", async (req, res, next) => {
  console.log("res.bjjody");
  console.log(req.body);

  postBoe.getBoeByBene(
    {
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
