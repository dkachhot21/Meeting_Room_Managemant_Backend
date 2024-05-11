const expressAsyncHandler = require("express-async-handler");
const { constants } = require("../constants");

const isAdmin = expressAsyncHandler(async (req, res, next) => {
    const role = req.user.role;
    if (role !== process.env.ADMIN) {
        res.status(constants.UNAUTHORIZED);
        throw new Error("You do not have access to this route.");
    }
    next();
})

module.exports = isAdmin;