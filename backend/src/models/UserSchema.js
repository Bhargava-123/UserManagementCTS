const mongoose = require('mongoose');

const email_regex = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        $regex: email_regex,
    },
    name: {
        type: String,
        maxlength: [100, "Name must be less than 100 characters"]
    },
    contactNumber: 
        {
            countryCode: {
                type: String,
                maxlength: 3
            },
            phoneNumber: {
                type: String,
                maxlength: 12,
            }
        }
    ,
    userType: {
        type: String,
        required: true,
        default: "user"
    },
    roleId: {
        type: String,
        deafult: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    // profilePicture: {
    //     data: Buffer,
    //     contentType: String,
    //     required: false,
    // }

}, { timestamps: true });


module.exports = mongoose.model("UserSchema", UserSchema);
