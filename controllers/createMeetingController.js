const expressAsyncHandler = require("express-async-handler");
const Meeting = require('../models/meetingSchema');
const { constants } = require("../constants");


//@desc     Create a Meeting
//@route    POST /meeting/create
//@access   Public

const createMeeting = expressAsyncHandler(async (req, res) => {
    const { title, userId, email, startTime, endTime } = req.body;

    if (!title || !userId || !startTime || !endTime) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Please Provide Meetings Details");
    }

    let sTime = new Date(startTime).toISOString();
    let eTime = new Date(endTime).toISOString();
    const currTime = Date.now();

    //Checking whether the provided time is in future or not 
    if (currTime > new Date(sTime).getTime() || sTime > eTime) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Please Enter correct time");
    }


    const meetingOverlapped = await Meeting.findOne({ userId: userId, startTime: { "$lt": eTime }, endTime: { "$gt": sTime } });

    if(meetingOverlapped){
        res.status(constants.CONFLICT);
        throw new Error("Meeting time overlapped for the User");
    }

    const meetingCreated = await Meeting.create({
        title,
        userId,
        email,
        startTime,
        endTime,
        creatorId: req.user.id
    })

    if (!meetingCreated) {
        res.send(constants.INTERNAL_SERVER_ERROR);
        throw new Error("Meeting Could not be Created");
    } else {
        res.status(constants.CREATED).json({
            message: "Meeting created Successfully",
            id: meetingCreated._id
        });
    }

});

module.exports = { createMeeting };