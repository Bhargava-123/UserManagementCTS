const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    email: String,
    name: String,
    country_code: String,
    phone_number: String,
    user_type: String,
    role_id: Number,
    is_active: Boolean,
    profile_picture: {
        data: Buffer,
        contentType: String,
    }

}, { timestamps: true });

const dummyUserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("UserSchema", userSchema);
module.exports = mongoose.model("dummyUserSchema", dummyUserSchema);