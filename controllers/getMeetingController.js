const { constants } = require("../constants");
const convertToSenderTimeZone = require("../config/convertToTimeZone");

const getMeetings = (req, res) => {
    const meetingId = req.query.meetingId;
    if (meetingId) {
        // Get a specific meeting by its ID
        let meeting = req.meeting;
        meeting = ({
            ...meeting.toObject(),
            startTime: convertToSenderTimeZone(meeting.startTime, req).toString(),
            endTime: convertToSenderTimeZone(meeting.endTime, req).toString()
        })
        res.status(constants.ACCEPTED).json({ message: `Successfully retrieved the meeting with id ${meetingId}`, data: meeting });
    } else {
        const meetingsInSenderTimeZone = req.meetingList.map(meeting=>({
            ...meeting.toObject(),
            startTime: convertToSenderTimeZone(meeting.startTime, req).toString(),
            endTime: convertToSenderTimeZone(meeting.endTime, req).toString()
        }));

        res.status(constants.ACCEPTED).json({ message: `Successfully retrieved the meeting List`, data: meetingsInSenderTimeZone });
    }
}

module.exports = { getMeetings };