const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please Enter the ID of the user"],
        ref: "User",
    },
    userEmail: {
        type: String,
        required: false
    },
    startTime: {
        type: Date,
        required: [true, "Please enter the Meeting Start time"]
    },
    endTime: {
        type: Date,
        required: [true, "Please ender the Meeting end Time"]
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a user id of the Creator"],
        ref: "User",
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Meetings", meetingSchema);