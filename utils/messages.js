const moment = require('moment')

function formatMessage (username, text) {

    let time = new Date;
    time = moment(time.getTime()).format("hh:mm");
    return {username,text,time}
}


module.exports = formatMessage;