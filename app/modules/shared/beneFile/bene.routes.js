const express = require("express");
const router = express.Router();
module.exports = router;
const postBene = require("../beneFile/bene.controller");

router.post("/post", async (req, res, next) => {
  console.log("inside ", req.user);
  console.log("inside ", req.body);
  req.body.bene.userId = req.user[0].companyId;
  console.log(req.body);
  postBene.addBeneFile(req.body, (err, resp) => {
    console.log("hello");
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Some error",
      });
    } else if (resp) {
      console.log("inside resp");
      res.status(200).json({
        message: "Bene added Successfully",
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some error",
      });
    }
  });
});

router.post("/getSingleBene", async (req, res, next) => {
  console.log("inside ", req.user);
  console.log("inside ", req.body);
  postBene.getSingleBene(
    {
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

router.post("/getByName", async (req, res, next) => {
  console.log("inside", req.user);
  console.log("inside", req.body);
  postBene.getBeneByName({ beneName: req.body.beneName }, (err, resp) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        message: "Some Error",
      });
    } else if (resp) {
      console.log("Inside Resp");
      res.status(200).json({
        data: resp,
      });
    } else {
      res.status(400).json({
        message: "Some Error",
      });
    }
  });
});

router.post("/get", async (req, res, next) => {
  console.log("inside ", req.user);
  postBene.getBene(
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
  console.log("inside ", req.user);
  postBene.updateBene(req.body.id, req.body.bene, (err, resp) => {
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
