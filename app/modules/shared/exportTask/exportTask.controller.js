const taskModel = require("./exportTask.model");

function addTaskFile(newPackage, callback) {
    taskModel.addTaskFile(newPackage, (err, res) => {
        console.log("hello");
        if (err) {
            callback(err, null);
        } else if (res) {
            callback(null, res);
        } else {
            callback(null, null);
        }
    });
}

function getTask(userId, callback) {
    console.log("hello");
    taskModel.getTask(userId, (err, res) => {
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

function updateTask(id, task, callback) {
    console.log("hello");
    taskModel.updateTask(id, task, (err, res) => {
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

function getType(userId, callback) {
    console.log("hello");
    taskModel.getType(userId, (err, res) => {
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

function getOne(userId, callback) {
    console.log("hello");
    taskModel.getOne(userId, (err, res) => {
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
    addTaskFile: addTaskFile,
    getTask: getTask,
    updateTask: updateTask,
    getType: getType,
    getOne: getOne
};