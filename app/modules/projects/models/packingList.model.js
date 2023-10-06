const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packingListSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    packingListNumber: {
        type: String,
    },
    packingCurrency: {
        type: String,
    },
    packingListAmount: {
        type: Number,
    },
    pipo: [{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    packingDoc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    packingListDate: {
        type: String,
    },
    sbNo: [{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    currency: {
        type: String,
    }

});

module.exports = mongoose.model("packingList", packingListSchema);