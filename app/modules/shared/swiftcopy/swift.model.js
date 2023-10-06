const swiftCopyFile = require("../../projects/models/swift.model");

function addSwiftFile(project, callback) {
    console.log("hiii");
    swiftCopyFile.create(project.swift, (err, res) => {
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
function getSwift(user, callback) {
    console.log(user);
    swiftCopyFile.find({ userId: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Swift getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function getSingleSwift(user, callback) {
    console.log(user);
    swiftCopyFile.find({ swiftCopyNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Swift getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateSwift(id, bene, callback) {
    console.log(id);
    console.log(bene);
    swiftCopyFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("Swift getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addSwiftFile: addSwiftFile,
    getSingleSwift: getSingleSwift,
    getSwift: getSwift,
    updateSwift: updateSwift,
};
