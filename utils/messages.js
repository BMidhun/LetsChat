const moment = require('moment')

function formatMessage (username, text) {

    let time = moment();
    time = moment(time).format("hh:mm");
    return {username,text,time}
}


module.exports = formatMessage;