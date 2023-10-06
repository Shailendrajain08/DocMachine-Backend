const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commercialSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    commercialNumber: {
        type: String,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    commercialDoc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    commercialDate: {
        type: String,
    },
    sbNo:{
        type: String,
    }

});

module.exports = mongoose.model("commercial", commercialSchema);
