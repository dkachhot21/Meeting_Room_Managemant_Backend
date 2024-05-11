const expressAsyncHandler = require("express-async-handler");
const { canUpdateMeeting } = require("../permissions/permissions");
const Meeting = require('../models/meetingSchema');
const { constants } = require("../constants");


const authUpdateMeeting = expressAsyncHandler(async (req, res, next) => {
    const { meetingId } = req.params;
    const meeting = await Meeting.findOne({ _id: meetingId });
    if (!canUpdateMeeting(req.user, meeting)) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("You are not Authorized for this Operation!");
    }
    req.meeting = meeting;
    next();
})

module.exports = authUpdateMeeting;