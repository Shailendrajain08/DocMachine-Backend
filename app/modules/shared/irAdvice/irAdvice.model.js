const irAdviceFile = require("../../projects/models/irAdvice.model").irAdviceModel;
const MasterModel = require('../masterFile/master.model');

function addIrAdviceFile(project, callback) {
    // console.log("hiii")
    irAdviceFile.create(project, (err, res) => {
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (res) {
            console.log("project added successfully:", res);
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getIrAdvice(user, callback) {
    console.log(user.userId);
    irAdviceFile.find({ userId: user.userId }).populate('pipo').populate('sbNo').exec(function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getOneIrAdvice(project, callback) {
    console.log("hiii");
    irAdviceFile.findOne({
        _id: "6059ba551bb7562f8abb4421"
    }).populate('pipo').populate('sbNo').exec(function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function updateIrAdvice(id, project, callback) {
    console.log("hiii");
    console.log(id);
    irAdviceFile.updateOne({
        _id: id
    }, { $set: project }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function updateIrAdviceByIrAdvice(id, project, callback) {
    console.log("hiii");
    console.log(id);
    irAdviceFile.updateOne({
        billNo: id
    }, { $set: project }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getIrAdviceByIrAdvice(user, callback) {
    console.log(user);
    irAdviceFile.findOne({ billNo: user.billNo, userId: user.userId }).populate('pipo').populate('sbNo').exec(function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getIrAdviceByBillNo(user, callback) {
    console.log(user);
    irAdviceFile.find({ billNo: user.billNo, userId: user.userId }).populate('pipo').populate('sbNo').exec(function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

async function updateIrAdviceByIr(id, project, userId, callback) {
    console.log("hiii");
    console.log(id);
    console.log(project);
    console.log(userId);
    var updateMasterBySb = async(sbId, irID, callback) => {
        updateShippingBillWithIR = async(data) => {
            let irRef = data.irRef;
            let removeDup = {};
            removeDup[irID] = true;
            for (let i in irRef) {
                removeDup[i] = true;
            }
            irRef = [];
            for (let i in removeDup) {
                irRef.push(i);
            }
            data.irRef = irRef;
            var def = new Promise((resolve, reject) => {
                console.log('hey check this', sbId, data);
                MasterModel.updateMaster(sbId, data, (data) => {
                    resolve(data);
                });
            });
            return def.promise;
        }
        return new Promise((resolve, reject) => {
            // find the sb record. merge the IR advice.
            console.log("sbid", sbId);
            MasterModel.getOneMaster({ id: sbId }, async(err, data) => {
                console.log("MasterModel", data);
                if (err) {
                    resolve(false);
                } else if (data && data._id) {
                    await updateShippingBillWithIR(data);
                    resolve(true);
                }
            });
        });
    }
    var list = [];
    for (let i in project.sbNo) {
        list.push(updateMasterBySb(project.sbNo[i], id));
    }
    var result = await Promise.all(list).then(success => {
        console.log("updated Shippping bills:", success);
    })
    irAdviceFile.updateOne({
        userId: userId,
        billNo: id
    }, project, { multi: true, upsert: true }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}


const getInwardbasedOnNumberAndcurrency = async(req, res) => {


    //
    // let result = await pipoFile.update({}, [ {$set:{ "amount" : {$toDouble: "$amount"}}} ], {multi:true})
    //  let result = await pipoFile.update({amount: {"$eq": "4,917.60"}}, { $set:{amount:4917.60}} , {multi:true});
    // // let result = await packingModel.find({}).limit(1)
    // // amount, recUSD, commission, conversionRate, convertedAmount,
    // res.send({ result: result })


    // toDouble




    try {
        // let data = {}
        // var eportData = await irAdviceFile.aggregate([
        //     { $match: { "file": "export", } },
        //     {
        //         $group: {
        //             _id: '$currency',
        //             totalItems: { $sum: 1 },
        //             "totalAmount": {
        //                 "$sum": {
        //                     "$toDouble": "$amount",
        //                 }
        //             }

        //         }
        //     }
        // ])


        // var importData = await irAdviceFile.aggregate([
        //     { $match: { "file": "import", } },
        //     {
        //         $group: {
        //             _id: '$currency',
        //             totalItems: { $sum: 1 },
        //             "totalAmount": {
        //                 "$sum": {
        //                     "$toDouble": "$amount",
        //                 }
        //             }

        //         }
        //     }
        // ])
        // data = { export: eportData, import: importData }

        // return data
        // ---------------------------------------------------------------


        let currencyWiseImportData = await irAdviceFile.aggregate([

            { $match: { "file": "import", userId: req.user[0].companyId } },
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
        let currencyWiseExportData = await irAdviceFile.aggregate([

            { $match: { "file": "export", userId: req.user[0].companyId } },
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

        let buyerWiseExportData = await irAdviceFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$currency', amount: '$amount' } }

                }
            }
        ])


        let buyerWiseImportData = await irAdviceFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId } },
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
            data.value.filter(x => x.currency).reduce(function(res, value) {
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += value.amount;
                return res;
            }, {});
            return {...data, convertData: result }

        })



        buyerWiseImportData = buyerWiseImportData.map((data) => {
            let result = [];
            data.value.filter(x => x.currency).reduce(function(res, value) {
                if (!res[value.currency]) {
                    res[value.currency] = { currency: value.currency, amount: 0 };
                    result.push(res[value.currency])
                }
                res[value.currency].amount += value.amount;
                return res;
            }, {});
            return {...data, convertData: result }
        })


        let importData = {

            currencyWise: currencyWiseImportData,
            buyerWise: buyerWiseImportData
        }

        let exportData = {

            currencyWise: currencyWiseExportData,
            buyerWise: buyerWiseExportData
        }


        let data = { import: importData, export: exportData }
        return data
    } catch (err) {

        console.log(err)
        return err
    }


}


const getTotalInwardRemitances = async() => {

    try {

        let exportData = {}

        let totalExportCount = await irAdviceFile.count({ file: "export" })

        let exportInward = await irAdviceFile.aggregate([

            { $match: { file: "export", amount: { $gt: 0 } } },
            {
                $group: {
                    _id: null,
                    pendingCount: { $sum: 1 },
                    toTalAmount: {
                        $sum: "$amount"
                    },
                }
            }
        ])

        exportData = { totalCount: totalExportCount, exportInwardData: exportInward }

        let importData = {}

        let totalImportCount = await irAdviceFile.count({ file: "import" })

        let importAmount = await irAdviceFile.aggregate([

            { $match: { file: "import", amount: { $gt: 0 } } },
            {
                $group: {
                    _id: null,
                    pendingCount: { $sum: 1 },
                    toTalAmount: {
                        $sum: "$amount"
                    },
                }
            }
        ])


        importData = { totalCount: totalImportCount, importInwardData: importAmount }

        return { import: importData, export: exportData }
    } catch (err) {

        console.log(err)
        return err
    }
}


module.exports = {
    addIrAdviceFile: addIrAdviceFile,
    getIrAdvice: getIrAdvice,
    getOneIrAdvice: getOneIrAdvice,
    updateIrAdvice: updateIrAdvice,
    updateIrAdviceByIrAdvice: updateIrAdviceByIrAdvice,
    getIrAdviceByIrAdvice: getIrAdviceByIrAdvice,
    getIrAdviceByBillNo: getIrAdviceByBillNo,
    updateIrAdviceByIr: updateIrAdviceByIr,
    getInwardbasedOnNumberAndcurrency: getInwardbasedOnNumberAndcurrency,
    getTotalInwardRemitances: getTotalInwardRemitances
};