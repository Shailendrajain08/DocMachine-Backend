const commercialFile = require("../../projects/models/commercial.model");

function addCommercialFile(project, callback) {
    console.log("hiii");
    commercialFile.create(project.commercial, (err, res) => {
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

function getCommercial(user, callback) {
    console.log(user);
    commercialFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Commecial getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleCommercial(user, callback) {
    console.log(user);
    commercialFile.find({ commercialNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("CommercialDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateCommercial(id, bene, callback) {
    console.log(id);
    console.log(bene);
    commercialFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("CommercialDoc getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addCommercialFile: addCommercialFile,
    getCommercial: getCommercial,
    getSingleCommercial: getSingleCommercial,
    updateCommercial: updateCommercial,
};
