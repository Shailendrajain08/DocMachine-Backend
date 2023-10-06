const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otherDocSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    otherDocNumber: {
        type: String,
    },
    otherDocName: {
        type: String,
    },
    pipo: {
        type: Array,
    },
    doc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    otherDocDate: {
        type: String,
    }

});

module.exports = mongoose.model("otherDoc", otherDocSchema);