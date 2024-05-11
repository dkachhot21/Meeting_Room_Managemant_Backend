const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { constants } = require('../constants');


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.AUTHORIZATION || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(constants.UNAUTHORIZED);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(constants.UNAUTHORIZED);
            throw new Error("User is unauthorized or token missing");
        }
    } else{
        res.status(constants.BAD_REQUEST);
        throw new Error("Invalid header format");
    }
});

module.exports = validateToken;