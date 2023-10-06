const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const irAdviceSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    billNo: {
        type: String,
    },
    sbNo:[{
        type: Schema.ObjectId,
        ref: 'masterrecord'
    }],
    date: {
        type: String,
    },
    customer: {
        type: String,
    },
    partyName: {
        type: String,
    },
    exchangeRate: {
        type: Number,
    },
    currency: {
        type: String,
    },
    amount: {
        type: Number,
    },
    commision: {
        type: String,
    },
    recievedDate: {
        type: String,
    },
    conversionDate: {
        type: String,
    },
    recievedAmount: {
        type: Number,
    },
    convertedAmount: {
        type: Number,
    },
    commodity: {
        type: String,
    },
    location: {
        type: String,
    },
    origin: {
        type: String,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    doc: {
        type: String
    },
    irdate: {
        type: String,
    }
}, { timestamps: true });
const irAdvice = mongoose.model("irAdvice", irAdviceSchema);

module.exports = {
    irAdviceModel: irAdvice,
    irAdviceSchema: irAdviceSchema
};
