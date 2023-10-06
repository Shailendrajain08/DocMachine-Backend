const otherDocFile = require("../../projects/models/otherDoc.model");

function addOtherDocFile(project, callback) {
    console.log("hiii");
    otherDocFile.create(project.otherDoc, (err, res) => {
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

function getOtherDoc(user, callback) {
    console.log(user);
    otherDocFile.find({ userId: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("OtherDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleOtherDoc(user, callback) {
    console.log(user);
    otherDocFile.find({ otherDocNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("otherDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateOtherDoc(id, bene, callback) {
    console.log(id);
    console.log(bene);
    otherDocFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("otherDoc getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addOtherDocFile: addOtherDocFile,
    getOtherDoc: getOtherDoc,
    getSingleOtherDoc: getSingleOtherDoc,
    updateOtherDoc: updateOtherDoc,
};
