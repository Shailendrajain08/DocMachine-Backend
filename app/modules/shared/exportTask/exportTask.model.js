const exportFile = require("../../projects/models/exportTask.model");

function addTaskFile(project, callback) {
    console.log(project);
    exportFile.create(project.task, (err, res) => {
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

function getTask(user, callback) {
    console.log(user);
    exportFile.find({ userId: user.userId }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function updateTask(id, task, callback) {
    console.log(id);
    console.log(task);
    exportFile.updateOne({
        _id: id
    }, { $set: task }, function(err, user) {
        console.log(user);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }

    });
}

function getType(user, callback) {
    console.log(user);
    exportFile.find({ userId: user.userId, fileType: user.fileType }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
        } else {
            callback(null, null);
        }
    });
}

function getOne(user, callback) {
    console.log(user);
    exportFile.find({ _id: user.id }, function(err, user) {
        console.log(user);
        console.log(err);
        if (err) {
            console.log("error while adding product:", err);
            callback(err, null);
        } else if (user) {
            console.log("Bene getting successfully:", user);
            callback(null, user);
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