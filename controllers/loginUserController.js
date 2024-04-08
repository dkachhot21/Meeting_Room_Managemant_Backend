const expressAsyncHandler = require("express-async-handler");
const { constants } = require("../constants");
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc     Login a user
//@route    POST /user/register
//@access   Public

const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(constants.BAD_REQUEST);
        throw new Error("All fields are Mandatory");
    }

    //checking user from the database
    const user = await User.findOne({ email });

    if (!user) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("User not Found, Please enter correct Email and Password");
    }

    //Compare Password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
        },
            process.env.JWT_SECRET,
            { expiresIn: '30m' } //Token Expiration time
        );
        res.status(constants.OK).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED);
        throw new Error("Incorrect Password");
    }
});

module.exports = { loginUser };