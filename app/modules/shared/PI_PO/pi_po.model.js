const pipoFile = require("../../projects/models/PI_PO.model");
const insuranceFile = require("../../projects/models/insurance.model");
const { MasterModel } = require("../../projects/models/masterFile.model");
var ObjectId = require('mongoose').Types.ObjectId;

function addPipoFile(project, callback) {
    console.log("hiii");
    pipoFile.create(project.pipo, (err, res) => {
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (res) {
            //console.log("project added successfully:", res);
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}


function getPipo(user, callback) {
    console.log(user);
    const callBackFunc =  (err, user) => {
        //console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            //console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    }
    pipoFile.find({userId: user.userId})
        .populate('lcRef')
        .populate('debitNoteRef')
        .populate('creditNoteRef')
        .populate('packingListRef')
        .populate('MasterServiceRef')
        .populate('billOfExchangeRef')
        .populate('destructionRef')
        .populate('commercialRef')
        .populate('airwayBlCopyRef')
        .populate('insuranceRef')
        .populate('sbRef')
        .populate('swiftCopyRef')
        .populate('ebrcRef')
        .populate('tryPartyAgreementRef')
        .populate('opinionReportRef')
        .populate('blcopyRefs')
        .populate({
            path: 'sbRef',
            populate: {
                path: 'irRef'
            }
        })
        .exec(callBackFunc)
}

function getSinglePipo(id, callback) {
    const callbackFunc = (err, user)  => {
        //console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            //console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    }
    if (ObjectId.isValid(id)) {
        pipoFile.find({_id: id})
            .populate('lcRef')
            .populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('swiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
            .exec(callbackFunc);
    } else {
        pipoFile.find({ pi_poNo: id})
            .populate('lcRef')
            .populate('debitNoteRef')
            .populate('creditNoteRef')
            .populate('packingListRef')
            .populate('MasterServiceRef')
            .populate('billOfExchangeRef')
            .populate('destructionRef')
            .populate('commercialRef')
            .populate('airwayBlCopyRef')
            .populate('insuranceRef')
            .populate('sbRef')
            .populate('swiftCopyRef')
            .populate('ebrcRef')
            .populate('blcopyRefs')
            .populate('tryPartyAgreementRef')
            .populate('opinionReportRef')
            .populate({
                path: 'sbRef',
                populate: {
                    path: 'irRef'
                }
            })
            .exec(callbackFunc);
    }
}

function updatePipo(id, bene, callback) {
    //console.log(id);
    //console.log(bene);
    pipoFile.updateOne({
            _id: id,
        }, {$set: bene},
        function (err, user) {
            //console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                //console.log("Bene getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

function updateSinglePipo(id, file, doc, callback) {
    console.log(id);
    console.log("bene");
    pipoFile.updateOne({_id: id}, {
            [file]: doc
        }, {multi: true},
        function (err, numberAffected) {
            //console.log(numberAffected);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (numberAffected) {
                //console.log("Updated Successfully:", numberAffected);
                callback(null, numberAffected);
            } else {
                callback(null, null);
            }
        });
}

function updateManyPipo(pipo, file, doc, data, userId, callback) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let advanceOutwardDate = `${day}-${month}-${year}`;
    let billUnderDate = `${day}-${month}-${year}`;
    if (file === 'advanceOutward') {
        pipoFile.updateMany({pi_poNo: {$in: pipo}}, {
                $set: {
                    [file]: doc,
                    ['advanceOutwardDate']: advanceOutwardDate
                }
            }, {multi: true},
            function (err, records) {
                if (err) {
                    console.log("error while adding product:", err);
                    callback(err, null);
                } else if (records) {
                    //console.log("Updated Successfully:", records);
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            });
    } else if (file === 'billUnder') {
        pipoFile.updateMany({pi_poNo: {$in: pipo}}, {
                $set: {
                    [file]: doc,
                    ['billUnderDate']: billUnderDate
                }
            }, {multi: true},
            function (err, records) {
                if (err) {
                    console.log("error while adding product:", err);
                    callback(err, null);
                } else if (records) {
                    //console.log("Updated Successfully:", records);
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            });
    } else {
        let temp = {};
        let listofupdates = [
            "billUnder",
            "invoiceReduction",
            "lcRef",
            "sbRef",
            "debitNoteRef",
            "creditNoteRef",
            "packingListRef",
            "MasterServiceRef",
            "billOfExchangeRef",
            "destructionRef",
            "commercialRef",
            "airwayBlCopyRef",
            "insuranceRef",
            "swiftCopyRef",
            "ebrcRef",
            "tryPartyAgreementRef",
            "opinionReportRef",
            "blcopyRefs"]
        for (let i in listofupdates) {
            if (data[listofupdates[i]]) {
                temp[listofupdates[i]] = data[listofupdates[i]];
            }
        }
        pipoFile.find({_id: {$in: pipo}, userId: userId}, function (err, values) {
            var operations = [];
            values.forEach(eachPipo => {
                let newvalues = {};
                console.log(JSON.stringify(eachPipo));
                for (let i in temp) {
                    if (!newvalues[i]) {
                        newvalues[i] = [];
                    }
                    if (eachPipo[i]) {
                        newvalues[i] = eachPipo[i];
                        for (let j in temp[i]) {
                            newvalues[i].push(temp[i][j]);
                        }
                        let removeduplicates = {};
                        for (let k in newvalues[i]) {
                            removeduplicates[newvalues[i][k]] = newvalues[i][k];
                        }
                        let removedDuplicates = [];
                        for (let l in removeduplicates) {
                            removedDuplicates.push(removeduplicates[l]);
                        }
                        newvalues[i] = removedDuplicates;
                    }
                }
                console.log("updated Values", newvalues);
                operations.push(pipoFile.updateOne({
                    _id: eachPipo._id,
                }, {
                    [file]: doc,
                    ...newvalues,
                }, {multi: true}));

            });
            Promise.all(operations).then((records) => {
                 if (records) {
                    console.log("Updated Successfully:", records);
                    callback(null, records);
                } else {
                    callback(null, null);
                }
            }, (error) => {
                if (error) {
                    console.log("error while updating product:", error);
                    callback(error, null);
                }
            });
        })
    }

}

function updateManyPipo1(pipo, file, callback) {
    pipoFile.updateMany({pi_poNo: {$in: pipo}}, {$set: file}, {multi: true},
        function (err, records) {
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (records) {
                //console.log("Updated Successfully:", records);
                callback(null, records);
            } else {
                callback(null, null);
            }
        });
}

function getManyPipo(pipo, id, callback) {
    pipoFile.find({
        pi_poNo: {
            $in: pipo
        },
        userId: id
    }, function (err, user) {
        //console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            //console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getPipoByBene(user, callback) {
    //console.log(user)
    pipoFile.find({benneName: user.beneName, userId: user.userId}, function (err, user) {
        //console.log(user)
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            //console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

const getPipobasedOnNumberAndcurrency = async (req, res) => {


    //
    // let result = await MasterModel.update({}, [ {$set:{ "sbdate" : {$toDate: "$sbdate"}}} ], {multi:true})
    //  let result = await MasterModel.update({sbdate: {"$eq": "0"}}, { $set:{sbdate:0}} , {multi:true});
    // let result = await MasterModel.find({}).count()
    // // amount, recUSD, commission, conversionRate, convertedAmount,
    // res.send({ result: result })


    // toDouble



    var data = {}

    try {
        let currencyWiseImportData = await pipoFile.aggregate([

            { $match: { "file": "import",userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$currency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$amount",
                        }
                    }

                }
            }
        ])
        let currencyWiseExportData = await pipoFile.aggregate([

            { $match: { "file": "export",userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$currency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$amount",
                        }
                    }

                }
            }


        ])

        let buyerWiseExportData = await pipoFile.aggregate([
            { $match: { "file": "export" ,userId: req.user[0].companyId,} },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: '$amount' } }

                }
            }
        ])

        buyerWiseExportData = buyerWiseExportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
              if (!res[value.currency]) {
                res[value.currency] = { currency: value.currency, amount: 0 };
                result.push(res[value.currency])
              }
              res[value.currency].amount += value.amount;
              return res;
            }, {});
            return { ...data, convertData: result }

          })


        let buyerWiseImportData = await pipoFile.aggregate([
            { $match: { "file": "import",userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: '$amount' } }

                }
            }


        ])

        buyerWiseImportData = buyerWiseImportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function (res, value) {
              if (!res[value.currency]) {
                res[value.currency] = { currency: value.currency, amount: 0 };
                result.push(res[value.currency])
              }
              res[value.currency].amount += value.amount;
              return res;
            }, {});
            return { ...data, convertData: result }
          })


        let importData = {

            currencyWise : currencyWiseImportData,
            buyerWise : buyerWiseImportData
         }

         let exportData = {

            currencyWise : currencyWiseExportData,
            buyerWise : buyerWiseExportData
         }


        data = { import: importData, export: exportData }

        return data
    } catch (err) {

        console.log(err)
        return err
    }



    // .aggregate([{
    //     $group :{
    //         _id :'$currency',
    //         totalItems:{$sum:1},
    //          "totalAmount": {
    //         "$sum": {
    //           "$toDouble": "$amount",
    //         }
    //       },

    //     }

    //       }])


    // .aggregate([

    //     { $match: { "file": "import" } },
    //     { $group :{
    //          _id :'$currency',
    //          totalItems:{$sum:1},
    //           "totalAmount": {
    //          "$sum": {
    //            "$toDouble": "$amount",
    //          }
    //        }

    //      }}
    //  ])
}



const getOrderPendingforShipment = async (req, res) => {
    try {

        let exportData = {}
        let shippingExportFullData = await pipoFile.aggregate([
            { $match: { "file": "export" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingFullData"
                }
            },
            {
                $match: {
                    "shippingFullData": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])



        let shippingExportPartialData = await pipoFile.aggregate([
            { $match: { "file": "export" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingPartialData"
                }
            },
            {
                $match: {
                    "shippingPartialData": { "$ne": [] }
                }
            },
            // { $match: { "amount" : { "$lt": shippingPartialData[0].fobValue}} },

        ])

        shippingExportPartialData = shippingExportPartialData.filter((data) => data.amount > data.shippingPartialData[0].fobValue)


        if (shippingExportFullData.length > 0) {
            shippingExportFullData = shippingExportFullData[0].count
            exportData.fullCount = shippingExportFullData
        }
        exportData.pendingCount = shippingExportPartialData.length


        // -----------------------------------------------------------------------

        let importData = {}
        let shippingImportFullData = await pipoFile.aggregate([
            { $match: { "file": "import" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingFullData"
                }
            },
            {
                $match: {
                    "shippingFullData": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])




        let shippingImportPartialData = await pipoFile.aggregate([
            { $match: { "file": "import" } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "pi_poNo",
                    foreignField: "pipo",
                    as: "shippingPartialData"
                }
            },
            {
                $match: {
                    "shippingPartialData": { "$ne": [] }
                }
            },
            // { $match: { "amount" : { "$lt": shippingPartialData[0].fobValue}} },

        ])

        shippingImportPartialData = shippingImportPartialData.filter((data) => data.amount > data.shippingPartialData[0].fobValue)


        if (shippingImportFullData.length > 0) {
            shippingImportFullData = shippingImportFullData[0].count
            importData.fullCount = shippingImportFullData
        }
        importData.pendingCount = shippingImportPartialData.length

        return { import: importData, export: exportData }

    } catch (error) {
        console.log("error", error)
    }

}


module.exports = {
    addPipoFile: addPipoFile,
    getPipo: getPipo,
    getSinglePipo: getSinglePipo,
    updatePipo: updatePipo,
    updateSinglePipo: updateSinglePipo,
    updateManyPipo: updateManyPipo,
    getManyPipo: getManyPipo,
    getPipoByBene: getPipoByBene,
    updateManyPipo1: updateManyPipo1,
    getPipobasedOnNumberAndcurrency: getPipobasedOnNumberAndcurrency,
    getOrderPendingforShipment: getOrderPendingforShipment
};
