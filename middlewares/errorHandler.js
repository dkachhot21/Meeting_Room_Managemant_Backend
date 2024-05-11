const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : constants.INTERNAL_SERVER_ERROR;
    const errorTitle = getStatusTitle(statusCode);

    res.status(statusCode).json({
        title: errorTitle,
        statusCode: statusCode,
        message: err.message,
        stackTrace: err.stack
    });

    next(err); // Call next to pass the error to the next error-handling middleware
};

// Helper function to get status code title
const getStatusTitle = (statusCode) => {
    switch (statusCode) {
        case constants.BAD_REQUEST:
            return "Bad Request";
        case constants.NOT_FOUND:
            return "Not Found";
        case constants.UNAUTHORIZED:
            return "Unauthorized";
        case constants.FORBIDDEN:
            return "Forbidden";
        case constants.INTERNAL_SERVER_ERROR:
            return "Internal Server Error";
        default:
            return "Unknown Error";
    }
};

module.exports = errorHandler;
