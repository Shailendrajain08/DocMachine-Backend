const destructionFile = require("../../projects/models/destruction.model");

function addDestructionFile(project, callback) {
    console.log("hiii");
    destructionFile.create(project.destruction, (err, res) => {
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

function getDestruction(user, callback) {
    console.log(user);
    destructionFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Destruction getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleDestruction(user, callback) {
    console.log(user);
    destructionFile.find({ destructionNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Destruction getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateDestruction(id, bene, callback) {
    console.log(id);
    console.log(bene);
    destructionFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Destruction getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addDestructionFile: addDestructionFile,
    getDestruction: getDestruction,
    getSingleDestruction: getSingleDestruction,
    updateDestruction: updateDestruction,
};
