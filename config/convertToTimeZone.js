const moment = require('moment-timezone');

function convertToSenderTimeZone(fetchedTime, req) {
    const senderTimeZone = req.body.timezone; // Assuming time zone is provided in the request body
    if (!senderTimeZone) {
        // If time zone is not specified, return the original time
        return fetchedTime;
    }
    // Convert fetched time to sender's time zone
    return moment(fetchedTime).tz(senderTimeZone);
}

module.exports = convertToSenderTimeZone;