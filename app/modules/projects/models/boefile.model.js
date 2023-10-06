const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const BoeSchema = new Schema({
    userId: {
        type: String,
    },
    dischargePort: {
        type: String,
    },
    origin: {
        type: String,
    },
    boeNumber: {
        type: String,
    },
    boeDate: {
        type: String,
    },
    benneName: {
        type: String,
    },
    iecCode: {
        type: String,
    },
    iecName: {
        type: String,
    },
    adCode: {
        type: String,
    },
    adBillNo: {
        type: String,
    },
    invoiceNumber: {
        type: String,
    },
    invoiceAmount: {
        type: Number,
        default: null
    },
    currency: {
        type: String,
    },
    settledAmount: {
        type: String,
    },
    status: {
        type: String,
    },
    freightAmount: {
        type: Number,
        default: null
    },
    freightCurrency: {
        type: String,
    },
    insuranceAmount: {
        type: Number,
        default: null
    },
    insuranceCurrency: {
        type: String,
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    discountCurrency: {
        type: String,
    },
    miscellaneousAmount: {
        type: Number,
        default: null
    },
    miscellaneousCurrency: {
        type: String,
    },
    commissionAmount: {
        type: Number,
        default: null
    },
    commissionCurrency: {
        type: String,
    },
    beneName: {
        type: String,
    },
    doc: {
        type: String,
    },
    pipo: {
        type: Array,
    },
    file: {
        type: String,
    }
}, { timestamps: true });
const boe = mongoose.model("boerecords", BoeSchema);

module.exports = {
    BoeModel: boe,
    BoeSchema: BoeSchema
};