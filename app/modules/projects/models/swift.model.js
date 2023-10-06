const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const swiftCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    swiftCopyNumber: {
        type: String,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    doc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    date: {
        type: String,
    }

});

module.exports = mongoose.model("SwiftCopy", swiftCopySchema);
