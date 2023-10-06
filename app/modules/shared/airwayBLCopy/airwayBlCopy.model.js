const airwayBlCopyFile = require("../../projects/models/airwayBlCopy.model");

function addAirwayBlcopyFile(project, callback) {
    console.log("hiii");
    airwayBlCopyFile.create(project.airwayBlCopy, (err, res) => {
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

function getAirwayBlcopy(user, callback) {
    console.log(user);
    airwayBlCopyFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("airwayblcopyno getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleAirwayBlcopy(user, callback) {
    console.log(user);
    airwayBlCopyFile.find({ airwayBlCopyNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("airwayBlCopyNumber getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateAirwayBlcopy(id, bene, callback) {
    console.log(id);
    console.log(bene);
    airwayBlCopyFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("airwayBlCopyNumber getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addAirwayBlcopyFile: addAirwayBlcopyFile,
    getSingleAirwayBlcopy: getSingleAirwayBlcopy,
    getAirwayBlcopy: getAirwayBlcopy,
    updateAirwayBlcopy: updateAirwayBlcopy,
};
