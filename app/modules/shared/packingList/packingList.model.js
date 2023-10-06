const packingListFile = require("../../projects/models/packingList.model");

function addPackingListFile(project, callback) {
    console.log("hiii");
    packingListFile.create(project.packingList, (err, res) => {
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

function getPackingList(user, callback) {
    console.log(user);
    packingListFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Packing List getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSinglePackingList(user, callback) {
    console.log(user);
    packingListFile.find({ packingListNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Packing List getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updatePackingList(id, bene, callback) {
    console.log(id);
    console.log(bene);
    packingListFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Packing List getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addPackingListFile: addPackingListFile,
    getPackingList: getPackingList,
    getSinglePackingList: getSinglePackingList,
    updatePackingList: updatePackingList,
};
