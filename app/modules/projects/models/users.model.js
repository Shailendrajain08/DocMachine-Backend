const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../../../helpers/validators");
const UserSchema = new Schema({
    iniReg: {
        type: String,
        enum: ["Native", "Google", "Facebook"]
    },
    gid: {
        type: String,
    },
    fid: {
        type: String,
    },
    fullName: {
        type: String,
    },
    last_name: {
        type: String,
    },
    mobileNo: {
        type: Number,
    },
    companyId: {
        type: String,
    },
    pricing: {
        type: String,
    },
    termsAndCondition: {
        type: Boolean
    },
    password: {
        type: String,
        minlength: 4
    },
    emailId: {
        type: String,
        unique: true,
        required: [true, ["Email Id Is Required"]],
        validate: {
            validator: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            message: "Not a valid email id"
        }
    },
    emailIdVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        required: false,
        default: false
    },

    projectemployersetup: {
        type: {
            setupcompleted: {
                type: Boolean,
                default: false
            },
        },
    },
    website: {
        type: String
    },
    facebook: {
        type: String
    },
    linkedIn: {
        type: String
    },
    twitter: {
        type: String
    },
    user_name: {
        type: String
    },
    companyName: {
        type: String
    },
    adress: {
        type: [{
            pincode: {
                type: Number,
            },
            flat_number: {
                type: String,
            },

            area: {
                type: String,
            },
            landmark: {
                type: String,
            },
            city: {
                type: String,
            },
        }]
    },
    members_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    }],
    location: {
        type: String
    },
    role: {
        type: String
    },
    verified: {
        type: String
    },
    date: {
        type: String
    },
    otpDone: {
        type: String
    },
    otpDetails: Schema.Types.Mixed,


}, { timestamps: true });
const User = mongoose.model("users", UserSchema);
module.exports = {
    UserModel: User,
    UserSchema: UserSchema
};