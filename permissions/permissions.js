const canUpdateMeeting = (user, meeting) => {
    return meeting.creatorId.toString() === user.id;
};

const canGetMeeting = (user, meeting) => {
    return (
        user.role === process.env.ADMIN ||
        meeting.userId.toString() === user.id.toString()
    )
};


module.exports = { canUpdateMeeting, canGetMeeting };