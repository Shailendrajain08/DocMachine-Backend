const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestructionSchema = new Schema({
    userId: {
        type: String,
    },
    file: {
        type: String,
    },
    destructionNumber: {
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
    destructionDate: {
        type: String,
    }

});

module.exports = mongoose.model("destruction", DestructionSchema);
