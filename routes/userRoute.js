const express = require('express');
const { registerUser } = require('../controllers/registerUserController');
const { getUsers, getUserById, currentUser } = require('../controllers/getUserController');
const { updateUserDetails, updateUserRole } = require('../controllers/updateUserController');
const { loginUser } = require('../controllers/loginUserController');
const validateToken = require('../middlewares/validateTokenHandler');
const isAdmin = require('../middlewares/isAdminHandler');


const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').get(loginUser);

router.route('/').get(validateToken, isAdmin, getUsers);
router.route('/current').get(validateToken, currentUser);

router.route('/:id').get(validateToken, getUserById);


router.route('/:id').patch(validateToken, updateUserDetails);

router.route('/role/:id').patch(validateToken, isAdmin, updateUserRole);

module.exports = router;