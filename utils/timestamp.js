const {DateTime } = require('luxon');

const formatDate = (date) => {
    return DateTime.fromJSDate.apply(date)
    .toFormat("ccccc, MMMM d yyyy, h:mm a");
}

module.exports = {formatDate}