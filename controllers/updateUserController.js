const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
const { constants } = require('../constants');

//@desc     Update the user details
//@route    PATCH /user/:id
//access    Private

const updateUserDetails = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let { name, email, password } = req.body;

    if (password)
        password = await bcrypt.hash(password, 10);

    const updateUser = await User.findByIdAndUpdate(id, { name: name, email: email, password: password }, { new: true });
    if (updateUser) {
        res.status(constants.CREATED).json({ message: "Update", newData: updateUser });
    } else {
        res.status(constants.INTERNAL_SERVER_ERROR);
        throw new Error("Profile Updated")
    }
});

//@desc     Update the user details
//@route    PATCH /user/role/:id
//access    Only Admin Access

const updateUserRole = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const role = req.body.role;
    if (!role || role !== process.env.ADMIN) {
        res.status(constants.BAD_REQUEST);
        throw new Error("Please provide a valid role");
    }

    const user = await User.findById(id);
    if (user.role === process.env.ADMIN) {
        res.status(constants.FORBIDDEN);
        throw new Error("Admin can not be Changed");
    }


    const roleUpdated = await User.findByIdAndUpdate(id, { $set: { 'role': role } }, { new: true });
    if (roleUpdated)
        res.status(constants.ACCEPTED).json({ message: "User is now Admin" });
    else {
        res.status(constants.INTERNAL_SERVER_ERROR);
        throw new Error("Role is not updated");
    }

})
module.exports = { updateUserDetails, updateUserRole };