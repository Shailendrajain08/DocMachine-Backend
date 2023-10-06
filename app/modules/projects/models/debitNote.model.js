const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debitNoteSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    debitNoteNumber: {
        type: String,
    },
    totalDebitAmount: {
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
    },


});

module.exports = mongoose.model("DebitNote", debitNoteSchema);
