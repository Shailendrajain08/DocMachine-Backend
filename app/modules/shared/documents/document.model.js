const postDocument = require("../../projects/models/document.model").DocumentModel;
const master = require("../../projects/models/masterFile.model").MasterModel;
function addDocument(project, callback) {
    // console.log("hiii")
    postDocument.create(project, (err, res) => {
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
function getMaster(project, callback) {
  console.log("hiii");
  master.findOne( {sbno: "7551320"}, function (err, user) {
    console.log(user);
    if (err) {
      console.log("error while adding product:", err);
      callback(err, null);
    } else if (user) {
      console.log("project added successfully:", user);
      callback(null, user);
    } else {
      callback(null, null);
    }

   } );
}

module.exports = {
    addDocument: addDocument,
    getMaster: getMaster
};
