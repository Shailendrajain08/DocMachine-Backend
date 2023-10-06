const insuranceFile = require("../../projects/models/insurance.model");

function addInsuranceFile(project, callback) {
    console.log("hiii");
    insuranceFile.create(project.insurance, (err, res) => {
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

function getInsurance(user, callback) {
    console.log(user);
    insuranceFile.find({ userId: user.userId }).populate('pipo').exec(function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Insurance getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getSingleInsurance(user, callback) {
    console.log(user);
    insuranceFile.find({ insuranceNumber: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("InsuranceDoc getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateInsurance(id, bene, callback) {
    console.log(id);
    console.log(bene);
    insuranceFile.updateOne({
            _id: id,
        }, { $set: bene },
        function(err, user) {
            console.log(user);
            if (err) {
                console.log("error while adding product:", err);
                callback(err, null);
            } else if (user) {
                console.log("InsuranceDoc getting successfully:", user);
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    );
}

module.exports = {
    addInsuranceFile: addInsuranceFile,
    getInsurance: getInsurance,
    getSingleInsurance: getSingleInsurance,
    updateInsurance: updateInsurance,
};
