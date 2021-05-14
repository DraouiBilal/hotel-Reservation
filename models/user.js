const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String
});

userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", userSchema)