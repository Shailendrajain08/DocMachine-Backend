const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EbrcCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    EbrcNumber: {
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
    ebrcdate: {
        type: String,
    }

});

module.exports = mongoose.model("EBRC", EbrcCopySchema);