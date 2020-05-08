const moment = require('moment')

function formatMessage (username, text) {

    let time = moment().utc(true);
    time = moment(time).format("hh:mm");
    return {username,text,time}
}


module.exports = formatMessage;