const postMasterFile = require("../../projects/models/masterFile.model").MasterModel;

function addMasterFile(project, callback) {
    // console.log("hiii")
    postMasterFile.create(project, (err, res) => {
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

function getMaster(user, callback) {
    console.log(user.userId);
    postMasterFile.find({ userId: user.userId }).populate('pipo').populate('irRef').exec(function(err, user) {
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

function getOneMaster(project, callback) {
    console.log("hiii");
    postMasterFile.findOne({
        _id: project.id
    }, function(err, data) {
        console.log(data);
        if (err) {
            console.log("error while fetching master sb record:", err);
            callback(err, null);
        } else if (data) {
            console.log("master sb record fetched successfully:", data);
            callback(null, data);
        } else {
            callback(null, null);
        }

    });
}

function updateMaster(id, project, callback) {
    console.log("hiii");
    console.log(id);
    console.log(project);
    postMasterFile.updateOne({
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

// function updateMasterBySb(sbno, project, callback) {
//     console.log("hiii")
//     console.log("shailendra", sbno)
//     console.log(project)
//     postMasterFile.updateOne({
//         sbno: sbno
//     }, { $set: project }, { upsert: true }, function(err, user) {
//         console.log(user)
//         if (err) {
//             console.log("error while adding product:", err);
//             callback(err, null);
//         } else if (user) {
//             console.log("project added successfully:", user);
//             callback(null, user);
//         } else {
//             callback(null, null);
//         }

//     });
// }


function updateMasterBySb(project, sbno, id, callback) {
    console.log("hiii");
    console.log(id);
    console.log(project);
    postMasterFile.updateOne({
        sbno: sbno,
        userId: id,
    }, { $set: project }, { multi: true, upsert: true }, function(err, user) {
        // { upsert: true, new: true },
        console.log("************** user");
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            console.log("we are here*************");
            callback(null, null);

        }

    });
}

function updateMasterIrInSB(project, sbno, id, callback) {
    console.log("hiii");
    console.log(id);
    console.log(project);
    console.log(sbno);
    postMasterFile.updateOne({
        sbno: sbno,
        userId: id,
    }, { $set: project }, { multi: true, upsert: true }, function(err, user) {
        // { upsert: true, new: true },
        console.log("************** user");
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            console.log("we are here*************");
            callback(null, null);

        }
    })
}
// postMasterFile.findOne({
//     sbno: id
// }, (err, master) => {
//     console.log(master);
//     master.adBillNo = project.adBillNo
//     master.save((err, data) => {
//         console.log("shailendra", err)
//         console.log("shailendra shailendra", data)
//     })
// })

// postMasterFile.findOne({
//     sbno: id
// }, (err, user) => {
//     if (err) {
//         // return res.send(err);
//         console.log("Error", err)
//     }
//     user.save(function(err, data) {
//         if (err) {
//             console.log("Error", err)
//                 // res.send(err);
//         } else {
//             console.log("SuccessFUll", data)
//                 // res.send('success')
//         }
//     })
// })



function getMasterBySb(user, callback) {
    console.log(user);
    postMasterFile.findOne({ sbno: user.sbno, userId: user.userId }, function(err, user) {
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



const getSBbasedOnNumberAndcurrency = async(req, res) => {

    var data = {}

    try {
        // let importData = await postMasterFile.aggregate([

        //     { $match: { "file": "import", } },
        //     {
        //         $group: {
        //             _id: '$fobCurrency',
        //             totalItems: { $sum: 1 },
        //             "totalAmount": {
        //                 "$sum": {
        //                     "$toDouble": "$fobValue",
        //                 }
        //             }

        //         }
        //     }
        // ])
        // let exportData = await postMasterFile.aggregate([

        //     { $match: { "file": "export" } },
        //     {
        //         $group: {
        //             _id: '$fobCurrency',
        //             totalItems: { $sum: 1 },
        //             "totalAmount": {
        //                 "$sum": {
        //                     "$toDouble": "$fobValue",
        //                 }
        //             }

        //         }
        //     }


        // ])
        // data = { import: importData, export: exportData }





        let currencyWiseImportData = await postMasterFile.aggregate([

            { $match: { "file": "import", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$fobCurrency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$fobValue",
                        }
                    }

                }
            }
        ])
        let currencyWiseExportData = await postMasterFile.aggregate([

            { $match: { "file": "export", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$fobCurrency',
                    totalItems: { $sum: 1 },
                    "totalAmount": {
                        "$sum": {
                            "$toDouble": "$fobValue",
                        }
                    }

                }
            }


        ])

        let buyerWiseExportData = await postMasterFile.aggregate([
            { $match: { "file": "export", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$fobCurrency', amount: '$fobValue' } }

                }
            }
        ])



        let buyerWiseImportData = await postMasterFile.aggregate([
            { $match: { "file": "import", userId: req.user[0].companyId, } },
            {
                $group: {
                    _id: '$buyerName',
                    totalItems: { $sum: 1 },
                    value: { $addToSet: { currency: '$fobCurrency', amount: '$fobValue' } }

                }
            }


        ])
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


        let importData = {

            currencyWise: currencyWiseImportData,
            buyerWise: buyerWiseImportData
        }

        let exportData = {

            currencyWise: currencyWiseExportData,
            buyerWise: buyerWiseExportData
        }


        data = { import: importData, export: exportData }

        return data



        return data
    } catch (err) {

        console.log(err)
        return err
    }



}



const getSBPendingSubmission = async(req, res) => {
    let formDate = new Date()
    let toDate = new Date()
    formDate.setDate(toDate.getDate() - 21)
    console.log("formDate", formDate)
    console.log("toDate", toDate)
        // let result = postMasterFile.find({ sbdate: { $gte: formDate, $lt: toDate } })
    let importData = await postMasterFile.aggregate([
        { $match: { sbdate: { $gte: formDate, $lt: toDate }, "file": "import" } },
        {
            $group: {
                _id: '$buyerName',
                // blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                toTalcount: { $sum: 1 },
                toTalAmount: {
                    "$sum": {
                        "$toInt": "$fobValue",
                    }
                },
            }
        }
    ])
    let exportData = await postMasterFile.aggregate([
        { $match: { sbdate: { $gte: formDate, $lt: toDate }, "file": "export" } },
        {
            $group: {
                _id: '$buyerName',
                // blcopyrefNumber : { $addToSet: '$blcopyrefNumber' },
                toTalcount: { $sum: 1 },
                toTalAmount: {
                    "$sum": {
                        "$toInt": "$fobValue",
                    }
                },


            }
        }
    ])

    return { import: importData, export: exportData }
}

module.exports = {
    addMasterFile: addMasterFile,
    getMaster: getMaster,
    getOneMaster: getOneMaster,
    updateMaster: updateMaster,
    updateMasterBySb: updateMasterBySb,
    getMasterBySb: getMasterBySb,
    getSBbasedOnNumberAndcurrency: getSBbasedOnNumberAndcurrency,
    getSBPendingSubmission: getSBPendingSubmission,
    updateMasterIrInSB: updateMasterIrInSB
};