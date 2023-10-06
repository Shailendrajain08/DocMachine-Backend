const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const MasterSchema = new Schema({
    userId: {
        type: String,
    },
    uploaddate: {
        type: String,
    },
    adBillNo: {
        type: String,
    },
    sbno: {
        type: String,
    },
    sbdate: {
        type: String,
    },
    portCode: {
        type: String,
    },
    ieccode: {
        type: String,
    },
    iecName: {
        type: String,
    },
    adCode: {
        type: String,
    },
    leodate: {
        type: String,
    },
    processingStaus: {
        type: String,
    },
    fobCurrency: {
        type: String,
    },
    fobValue: {
        type: Number,
    },
    invoices: {
        type: [{
            sno: {
                type: String
            },
            invoiceno: {
                type: String
            },
            amount: {
                type: Number,
                default: 0
            },
            currency: {
                type: String
            }
        }],
        required: true
    },
    realizedFobCurrency: {
        type: String,
    },
    realizedFobValue: {
        type: Number,
    },
    equivalentFobValue: {
        type: Number,
    },
    freightCurrency: {
        type: String,
    },
    freightValue: {
        type: Number,
    },
    realizedFreightCurrency: {
        type: String,
    },
    realizedFreightValue: {
        type: Number,
    },
    insuranceCurrency: {
        type: String,
    },
    insuranceValue: {
        type: Number,
    },
    realizedInsuranceValue: {
        type: Number,
    },
    bankingCharges: {
        type: Number,
    },
    expectedPaymentlastdate: {
        type: String,
    },
    AddedDate: {
        type: String,
    },
    modifiedDate: {
        type: String,
    },
    beneName: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    doc: {
        type: String
    },
    file: {
        type: String,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    irRef:[{
        type: Schema.ObjectId,
        ref: 'irAdvice'
    }],
    exporterLocationCode: {
        type: String,
    },
    countryOfFinaldestination: {
        type: String,
    },
    consigneeName: {
        type: String,
    },
    exchangeRate: {
        type: String,
    },
    blCopyDoc: Schema.Types.Mixed,
    commercialDoc: Schema.Types.Mixed,
    packingDoc: Schema.Types.Mixed
}, { timestamps: true });
const Master = mongoose.model("masterrecord", MasterSchema, "masterrecord");

module.exports = {
    MasterModel: Master,
    MasterSchema: MasterSchema
};
