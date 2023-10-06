const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditNoteSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    creditNoteNumber: {
        type: String,
    },
    creditNoteAmount: {
        type: Number,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    doc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    currency: {
        type: String,
    },
    date: {
        type: String,
    }

});

module.exports = mongoose.model("creditNote", creditNoteSchema);
