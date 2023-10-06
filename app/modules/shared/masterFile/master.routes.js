const express = require("express");
const router = express.Router();
module.exports = router;
const postMaster = require('../masterFile/master.controller');
const postPipo = require("../PI_PO/pi_po.controller");

router.get("/get", async(req, res, next) => {
    console.log('inside ', req.user);
    postMaster.getMaster({
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
                    message: "Getting Master data",
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
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    req.body.master.uploaddate = `${day}-${month}-${year}`;
    postMaster.updateMaster(
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

router.post("/updateBySb", async(req, res, next) => {
    console.log("****************res.bjjody");
    console.log(req.body);

    postMaster.updateMasterBySb(
        req.body.master, req.body.sbno, req.user[0].companyId, (err, resp) => {
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

router.post("/updateIrInSb", async(req, res, next) => {
    console.log("****************res.bjjody");
    console.log(req.body);
    console.log(req.body.master);

    postMaster.updateMasterIrInSB(
        req.body.master, req.body.sbno, req.user[0].companyId, (err, resp) => {
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

router.post("/getMasterBySb", async(req, res, next) => {
    console.log("res.bjjody");
    console.log(req.body);

    postMaster.getMasterBySb({
        sbno: req.body.sbno,
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

router.get("/mergePISb", async(req, res) => {
    // let pipo = req.params.pipo;
    postMaster.getMaster({
        userId: req.user[0].companyId,
    }, (err, masterData) => {
        if (err) {
            res.json({
                message: "data not found, Some Error"
            })
        } else {
            postPipo.getPipo({
                    userId: req.user[0].companyId,
                },
                (err, pipoData) => {
                    let mergeData = []
                    let index = []
                    if (err) {
                        res.status(400).json({
                            message: "Some error",
                        });
                    } else {
                        let i = 0
                        for (let master of masterData) {
                            for (let pi of pipoData) {
                                console.log("169", master.pipo[0])
                                let currentpipo = master.pipo[0]
                                if (currentpipo == pi.pi_poNo) {
                                    let newData = {}
                                        // newData = master
                                    newData.sbno = master.sbno
                                    newData.sbdate = master.sbdate
                                    newData.portCode = master.portCode
                                    newData.pipo = master.pipo
                                    newData.iecName = master.iecName
                                    newData.ieccode = master.ieccode
                                    newData.exporterLocationCode = master.exporterLocationCode
                                    newData.countryOfFinaldestination = master.countryOfFinaldestination
                                    newData.consigneeName = master.consigneeName
                                    newData.adCode = master.adCode
                                    newData.userId = master.userId
                                    newData.buyerName = master.buyerName
                                    newData.exchangeRate = master.exchangeRate
                                    newData.uploaddate = master.uploaddate
                                    newData.file = master.file
                                    newData.sbDoc = master.doc
                                    newData['amount'] = pi.amount
                                    newData['paymentTerm'] = pi.paymentTerm
                                    newData['commercial'] = pi.commercial
                                    newData['lastDayShipment'] = pi.lastDayShipment
                                    newData['paymentTerm'] = pi.paymentTerm
                                    newData['pipoDate'] = pi.date
                                    newData['location'] = pi.location
                                    newData['poDoc1'] = pi.doc1
                                    newData['piDoc'] = pi.doc
                                    newData['document'] = pi.document
                                    newData['purchasedate'] = pi.document
                                    newData['airwayBlcopy'] = pi.airwayBlcopy
                                    newData['sb'] = pi.sb
                                    newData['packingList'] = pi.packingList

                                    mergeData.push(newData)
                                    index.push(i)
                                        // masterData.push(Object.assign({}, master, pi))
                                    console.log("123", masterData)
                                }
                                i++;
                            }
                        }
                        // for (let i = 0; i < index.length; i++) {
                        //     masterData[index[i]] = mergeData[i]
                        // }



                        res.json({
                            // masterData: masterData,
                            // pipoData: pipoData,
                            mergeData: mergeData
                        })
                    }
                })

        }
    })
});