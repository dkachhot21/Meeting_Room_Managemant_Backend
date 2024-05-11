const expressAsyncHandler = require('express-async-handler');
const Meeting = require('../models/meetingSchema');
const { constants } = require('../constants');


const updateMeeting = expressAsyncHandler(async (req, res) => {
    const { title, userId, email, startTime, endTime } = req.body;

    const { meetingId } = req.params;
    if (!meetingId) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Please enter meeting id");
    }

    const meeting = req.meeting;
    if (!meeting) {
        res.status(constants.NOT_FOUND);
        throw new Error("No meeting found with given Id");
    }


    let sTime = new Date(startTime).toISOString();
    let eTime = new Date(endTime).toISOString();
    const currTime = Date.now();

    //Checking whether the provided time is in future or not 
    if (currTime > new Date(sTime).getTime() || sTime > eTime) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Please Enter correct time");
    }

    //Checking if the new Time is overlapping or not without including the meeting that we are updating
    const meetingOverlapped = await Meeting.findOne({
        _id: { $ne: meetingId },
        userId: userId,
        startTime: { "$lt": eTime },
        endTime: { "$gt": sTime }
    });

    if (meetingOverlapped) {
        res.status(constants.CONFLICT);
        throw new Error("Meeting time overlapped for the User");
    }

    //updating the Meeting Details
    const updatedMeeting = await Meeting.findOneAndUpdate({ _id: meetingId }, req.body, { new: true });
    if (!updatedMeeting) {
        res.status(constants.INTERNAL_SERVER_ERROR);
        throw new Error("There is an error to update the Meeting");
    } else {
        res.status(constants.CREATED).json({ message: "Meeting Successfully Updated", data: updatedMeeting });
    }

})

module.exports = updateMeeting;