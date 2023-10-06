const masterServiceFile = require("../../projects/models/masterService.model");

function addMasterServiceFile(project, callback) {
    console.log("hiii");
    masterServiceFile.create(project.masterService, (err, res) => {
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

function getMasterService(user, callback) {
    console.log(user);
    masterServiceFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("masterService getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleMasterService(user, callback) {
    console.log(user);
    masterServiceFile.find({ masterServiceNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("masterService getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateMasterService(id, bene, callback) {
    console.log(id);
    console.log(bene);
    masterServiceFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("masterService getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addMasterServiceFile: addMasterServiceFile,
    getMasterService: getMasterService,
    getSingleMasterService: getSingleMasterService,
    updateMasterService: updateMasterService,
};
