const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const { constants } = require('../constants');

//@desc     Register a user
//@route    POST /user/register
//@access   Public

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("All fields are Mandatory");
    }

    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(constants.CONFLICT);
        throw new Error("Email already exists");
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Build user object based on the request body
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(constants.CREATED).json({
            message: 'Registered',
            success: true,
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(constants.BAD_REQUEST);
        throw new Error("User Data is not Valid");
    }
})

module.exports = { registerUser };