const ebrcFile = require("../../projects/models/EBRC.model");

function addEbrcFile(project, callback) {
    console.log("hiii");
    ebrcFile.create(project.ebrc, (err, res) => {
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

function getEbrc(user, callback) {
    console.log(user);
    ebrcFile.find({ userId: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("EBRC getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function getSingleEbrc(user, callback) {
    console.log(user);
    ebrcFile.find({ EbrcNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("EBRC getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}
function updateEbrc(id, bene, callback) {
    console.log(id);
    console.log(bene);
    ebrcFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("EBRC getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addEbrcFile: addEbrcFile,
    getSingleEbrc: getSingleEbrc,
    getEbrc: getEbrc,
    updateEbrc: updateEbrc,
};
