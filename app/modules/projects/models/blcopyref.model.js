const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlrefCopySchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    blcopyrefNumber: {
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
    blcopyrefdate: {
        type: String,
    }

});

module.exports = mongoose.model("blcopyRef", BlrefCopySchema);
