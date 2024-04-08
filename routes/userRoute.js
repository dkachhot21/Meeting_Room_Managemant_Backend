const express = require('express');
const { registerUser } = require('../controllers/registerUserController');
const { getUsers, getUserById, currentUser } = require('../controllers/getUserController');
const { updateUserDetails, updateUserRole } = require('../controllers/updateUserController');
const { loginUser } = require('../controllers/loginUserController');
const validateToken = require('../middlewares/validateTokenHandler');
const isAdmin = require('../middlewares/isAdminHandler');


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Routes
 *   description: Endpoints for managing users
 */


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with name, email, and password.
 *     tags: [User Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Registered
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 _id:
 *                   type: string
 *                   example: 6098e6a9e54a1818203d2a6e
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *       400:
 *         description: Bad request or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are Mandatory
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already exists
 */
router.route('/register').post(registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login as a user
 *     description: Login with email and password to get access token.
 *     tags: [User Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA5OGU2YTkxZTU0YTE4MTgyMDNkMmE2IiwidXNlcm5hbWUiOiJ1c2VybmFtZSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIxMTYxNTQ3LCJleHAiOjE2MjExNjQzNDd9fQ.qVXeD6Lvts32jJTPjF7NYnNNnhK7e3GwVoWqz8YLHvw
 *       400:
 *         description: Bad request or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are Mandatory
 *       401:
 *         description: Unauthorized, incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Incorrect Password
 */
router.route('/login').post(loginUser);

/**
 * @swagger
 * /user/current:
 *   get:
 *     summary: Get current user
 *     description: Retrieve details of the currently logged-in user.
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
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
 */
router.route('/current').get(validateToken, currentUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: [User Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.route('/').get(validateToken, isAdmin, getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve user details by providing user ID.
 *     tags: [User Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Provide an id
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not Found
 */
router.route('/:id').get(validateToken, isAdmin, getUserById);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update user details by ID
 *     description: Update user details including name, email, and password by providing user ID.
 *     tags: [User Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             password: newPassword123
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Update
 *                 newData:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Profile Updated
 */
router.route('/:id').patch(validateToken, updateUserDetails);

/**
 * @swagger
 * /user/role/{id}:
 *   patch:
 *     summary: Update user role by ID
 *     description: Update user role to admin by providing user ID.
 *     tags: [User Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin]
 *           example:
 *             role: admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       202:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User is now Admin
 *       400:
 *         description: Bad request or invalid role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Please provide a valid role
 *       403:
 *         description: Forbidden, admin role cannot be changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Admin can not be Changed
 */
router.route('/role/:id').patch(validateToken, isAdmin, updateUserRole);

module.exports = router;