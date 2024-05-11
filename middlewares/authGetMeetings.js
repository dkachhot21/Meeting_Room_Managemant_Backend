const expressAsyncHandler = require('express-async-handler');
const Meeting = require('../models/meetingSchema');
const { canGetMeeting } = require('../permissions/permissions');
const { constants } = require('../constants');


const authGetMeeting = expressAsyncHandler(async (req, res, next) => {
    const meetingId = req.query.meetingId;
    if (meetingId) {
        const meeting = await Meeting.findOne({ _id: meetingId });
        if (!meeting) {
            res.status(constants.NOT_FOUND);
            throw new Error("Meeting Not Found");
        } else if (!canGetMeeting(req.user, meeting)) {
            res.status(constants.UNAUTHORIZED);
            throw new Error("You are not Authorized")
        }
        req.meeting = meeting;
        next();
    } else {
        if (req.user.role === process.env.ADMIN) {
            // If user is admin get all the meetings in the database
            const meetings = await Meeting.find().sort('dateAndTime');
            if (!meetings) {
                res.status(constants.INTERNAL_SERVER_ERROR);
                throw new Error("Error in fetching the Meetings");
            }
            req.meetingList = meetings;
            next();
        } else {
            // Else only get the users own meetings
            const meetings = await Meeting.find({ userId: req.user.id }).sort('dateAndTime');
            if (!meetings) {
                res.status(constants.INTERNAL_SERVER_ERROR);
                throw new Error("Error in fetching the Meetings");
            }
            req.meetingList = meetings;
            next();
        }
    }
});

module.exports = { authGetMeeting };