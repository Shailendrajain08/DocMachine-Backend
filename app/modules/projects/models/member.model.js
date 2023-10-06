const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const MemberSchema = new Schema(
    {
        
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        role: {
            type: String,
        },
        
        teamId: {
            type: String,
        },
        imageUrl: {
            type: String,
        }
        
        
        
    },
    { timestamps: true }
);
const member = mongoose.model("teamMember", MemberSchema, "teamMember");

module.exports = {
    MemberModel : member,
    MemberSchema: MemberSchema
};