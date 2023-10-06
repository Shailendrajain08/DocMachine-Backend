const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const edpmsSchema = new Schema({
    userId: {
        type: String,
    },
    bank: {
        type: String,
    },
    sbNo: {
        type: String,
        unique: true
    },
    sbDate: {
        type: String,
    },
    adCode: {
        type: String,
    },
    portCode: {
        type: String,
    },
    edpmsStatus: {
        type: String,
    },
    adRefNo: {
        type: String,
    },
    sbAmount: {
        type: String,
    },
    sbBalanceAmount: {
        type: String,
    },
    sbCurrency: {
        type: String,
    },
    statusMeaning: {
        type: String,
    },
    systemStatus: {
        type: String,
    },
    docAvailable: {
        type: Boolean,
    },
    action: {
        type: Array,
    },
});

const EDPMS = mongoose.model("Edpms", edpmsSchema);

module.exports = {
    edpms: EDPMS,
    edpmsSchema: edpmsSchema
};
