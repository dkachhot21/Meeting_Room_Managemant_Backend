const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the Name"]
    },
    email: {
        type: String,
        required: [true, "Please enter the username"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    },
    role: {
        type: String,
        default: "basic"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);