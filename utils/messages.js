const moment = require('moment')

function formatMessage (username, text) {

   const time = moment("145","hmm").format('HH:MM');
    return {username,text,time}
}


module.exports = formatMessage;