const TeamModel = require('./team.model');

function addTeam(newPackage, callback) {
    console.log(newPackage);
    TeamModel.addTeam(newPackage, (err, res) => {

        console.log("hello22");
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTeam(newPackage, callback) {
    console.log(newPackage);
    TeamModel.getTeam(newPackage, (err, res) => {

        console.log("hello22");
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function updateTeam(id,team, callback) {
    console.log("hello");
    TeamModel.updateTeam(id,team, (err, res) => {
        // console.log("hello")
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

module.exports = {
    addTeam: addTeam,
    getTeam: getTeam,
    updateTeam: updateTeam
};
