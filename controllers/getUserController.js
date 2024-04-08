const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userSchema');
const { constants } = require('../constants');

//@desc     Get all users
//@route    GET /user
//@access   Only Admin Access

const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(constants.ACCEPTED).json({ users: users });
});


//@desc     Get  single user by ID
//@route    GET /user/:id
//@access   Only Admin Access

const getUserById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Provide an id");
    }

    let user = await User.findById(id);

    if (!user) {
        res.status(constants.NOT_FOUND);
        throw new Error("User not Found");
    } else {
        user = user.toJSON();
        const keysToRemove = ["_id", "createdAt", "updatedAt", "__v", "password"];
        keysToRemove.forEach((key) => {
            delete user[key];
        });
    }

    res.status(constants.ACCEPTED).json({ message: "Successfully got user info", user: user });
});


//@desc     Get  single user by ID
//@route    GET /user/current
//@access   Private
const currentUser = (req, res) => {
    console.log(req);
    // console.log("Hello");
    const user = req.user;
    // console.log(user);
    res.status(constants.ACCEPTED).json({ user });
};


module.exports = { getUsers, getUserById, currentUser };