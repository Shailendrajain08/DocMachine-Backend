const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AirwayBlCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    airwayBlCopyNumber: {
        type: String,
    },
    pipo:[{
        type: Schema.ObjectId,
        ref: 'PI_PO'
    }],
    blCopyDoc: {
        type: String,
    },
    buyerName: {
        type: String,
    },
    airwayBlCopydate: {
        type: String,
    },
    sbNo:{
        type: String,
    }

});

module.exports = mongoose.model("airwayBlCopy", AirwayBlCopySchema);
