const express = require('express');
const { createMeeting } = require('../controllers/createMeetingController');
const validateToken = require('../middlewares/validateTokenHandler');
const isAdmin = require('../middlewares/isAdminHandler');
const updateMeeting = require('../controllers/updateMeetingController');
const authUpdateMeeting = require('../middlewares/authUpdateMeeting');
const { authGetMeeting } = require('../middlewares/authGetMeetings');
const { getMeetings } = require('../controllers/getMeetingController');

const router = express.Router();


router.route('/create').post(validateToken, isAdmin, createMeeting);

router.route('/update/:meetingId').patch(validateToken, isAdmin, authUpdateMeeting, updateMeeting);

router.route('/get').get(validateToken, authGetMeeting, getMeetings);

module.exports = router;