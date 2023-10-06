const edpmsFile = require("../../projects/models/edpms.model").edpms;

async function addEdpms(project, callback) {
    var promises = [];
    for (let i=0;i<project.length;i++) {
        promises.push(edpmsFile.findOneAndUpdate({sbNo: project[i].sbNo}, project[i], {upsert: true}));
    }
    Promise.all(promises).then((res) => {
        console.log("Edpms added successfully:", res);
        callback(null, res);
    }, err => {
        console.log("error while adding Edpms:", err);
        callback(err, null);
    });
    // edpmsFile.create(project, (err, res) => {
    //     if (err) {
    //         console.log("error while adding Edpms:", err);
    //         callback(err, null);
    //     } else if (res) {
    //         console.log("Edpms added successfully:", res);
    //         callback(null, res);
    //     } else {
    //         callback(null, null);
    //     }
    // });
}

function getEdpms(user, callback) {
    console.log(user.userId);
    edpmsFile.find({ userId: user.userId }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while getting Edpms:", err);
            callback(err, null);
        } else if (user) {
            console.log("project added successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getOneEdpms(ID, callback) {
    console.log("hiii");
    edpmsFile.findOne({
        _id: ID
    }, function(err, user) {
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

function updateEdpms(id, project, callback) {
    console.log("hiii");
    console.log(id);
    edpmsFile.updateOne({
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

function updateEdpmsByEdpms(id, project, callback) {
    console.log("hiii");
    console.log(id);
    irAdviceFile.updateOne({
        sbNo: id
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

function getEdpmsByEdpms(user, callback) {
    console.log(user);
    edpmsFile.findOne({ sbNo: user.sbNo, userId: user.userId }, function(err, user) {
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

function getEdpmsBySbno(user, callback) {
    console.log(user);
    edpmsFile.find({ sbNo: user.sbNo, userId: user.userId }, function(err, user) {
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

const getEDPMSData = async (req, res) => {

    try {
        let data = {}

        let totalEDPMSEntries = await edpmsFile.count({ userId: req.user[0].companyId })

        let uploadData = await edpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$ne": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        if (uploadData.length > 0) {
            uploadData = uploadData[0].count
        }


        let pendingData = await edpmsFile.aggregate([
            { $match: { userId: req.user[0].companyId } },
            {
                $lookup:
                {
                    from: "masterrecord",
                    localField: "sbNo",
                    foreignField: "sbno",
                    as: "docs"
                }
            },
            {
                $match: {
                    "docs": { "$eq": [] }
                },
            },
            { $group: { _id: null, count: { $sum: 1 } } }
        ])

        if (pendingData.length > 0) {
            pendingData = pendingData[0].count
        }

        data = { totalEDPMSEntries: totalEDPMSEntries, uploadData: uploadData, pendingData: pendingData }
        return data

    } catch (err) {
        console.log("Err", err)

    }




}




module.exports = {
    addEdpms: addEdpms,
    getEdpms: getEdpms,
    updateEdpms: updateEdpms,
    getOneEdpms: getOneEdpms,
    updateEdpmsByEdpms: updateEdpmsByEdpms,
    getEdpmsByEdpms: getEdpmsByEdpms,
    getEdpmsBySbno: getEdpmsBySbno,
    getEDPMSData: getEDPMSData
};
