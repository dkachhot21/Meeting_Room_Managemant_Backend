const express = require('express');
const { createMeeting } = require('../controllers/createMeetingController');
const validateToken = require('../middlewares/validateTokenHandler');
const isAdmin = require('../middlewares/isAdminHandler');
const updateMeeting = require('../controllers/updateMeetingController');
const authUpdateMeeting = require('../middlewares/authUpdateMeeting');
const { authGetMeeting } = require('../middlewares/authGetMeetings');
const { getMeetings } = require('../controllers/getMeetingController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meeting Routes
 *   description: Endpoints for managing meetings
 */


/**
 * @swagger
 * /meeting/create:
 *   post:
 *     summary: Create a new meeting
 *     description: Create a new meeting with title, userId, email, startTime, and endTime.
 *     tags: [Meeting Routes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - title
 *               - userId
 *               - startTime
 *               - endTime
 *           example:
 *             title: Team Meeting
 *             userId: 6098e6a9e54a1818203d2a6e
 *             email: john@example.com
 *             startTime: "2024-04-09T09:00:00Z"
 *             endTime: "2024-04-09T10:00:00Z"
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting created Successfully
 *                 id:
 *                   type: string
 *                   example: 6098e6a9e54a1818203d2a6e
 *       400:
 *         description: Bad request or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please Provide Meetings Details
 *       409:
 *         description: Conflict, meeting time overlapped for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Meeting time overlapped for the User
 */
router.route('/create').post(validateToken, isAdmin, createMeeting);

/**
 * @swagger
 * /meeting/update/{meetingId}:
 *   patch:
 *     summary: Update a meeting by ID
 *     description: Update a meeting's details by providing its ID.
 *     tags: [Meeting Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: meetingId
 *         required: true
 *         description: Meeting ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *             example:
 *               title: Updated Team Meeting
 *               startTime: "2024-04-09T09:30:00Z"
 *               endTime: "2024-04-09T10:30:00Z"
 *     responses:
 *       201:
 *         description: Meeting details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Meeting Successfully Updated
 *                 data:
 *                   $ref: '#/components/schemas/Meeting'
 *       400:
 *         description: Bad request or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please enter meeting id
 *       404:
 *         description: Meeting not found with given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No meeting found with given Id
 */
router.route('/update/:meetingId').patch(validateToken, isAdmin, authUpdateMeeting, updateMeeting);

/**
 * @swagger
 * /meeting/get:
 *   get:
 *     summary: Get meetings
 *     description: Retrieve a list of meetings. If user is admin and provides a meetingId query parameter, retrieves the meeting with the specified ID. If user is admin and does not provide a meetingId query parameter, retrieves all meetings. If user is not admin, retrieves user's own meetings. If meetingId is provided, it takes precedence over user's own meetings.
 *     tags: [Meeting Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: meetingId
 *         schema:
 *           type: string
 *         description: ID of the meeting to retrieve (optional)
 *     responses:
 *       200:
 *         description: A list of meetings or a single meeting if meetingId is provided
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Meeting'
 *       401:
 *         description: Unauthorized, missing or invalid access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Meeting not found with given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Meeting Not Found
 */
router.route('/get').get(validateToken, authGetMeeting, getMeetings);

module.exports = router;