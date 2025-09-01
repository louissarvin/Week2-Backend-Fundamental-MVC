const moment = require('moment');

function scheduleTask() {
    let currentDate = moment().format('LLLL');
    console.log(`Current time: ${currentDate}`);

    let next3Days = moment().add(3, 'days').format('LLLL');
    console.log(`Schedule Task for: ${next3Days}`);

    let different = moment().add(3, 'days').diff(moment());
    
    console.log(`Task will run in ${moment.duration(different).humanize()}`);
}


module.exports = { scheduleTask };