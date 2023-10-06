const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billOfExchangeSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    billExchangeNumber: {
        type: String,
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
    billOfExchangeDate: {
        type: String,
    }

});

module.exports = mongoose.model("billOfExchange", billOfExchangeSchema);
