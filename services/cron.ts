const nodeCron = require('node-cron');
const User = require('../users/users.model');

//start a cron job every minute
const remind = nodeCron.schedule('* * * * *', async () => {
    var currentdate = new Date();
    const time = currentdate.getHours() + ":" + currentdate.getMinutes();

    const notificationData = await User.aggregate([
        {
            '$lookup': {
                from: 'routines',
                localField: '_id',
                foreignField: 'user_id',
                as: 'routines'
            }
        },
        {
            $project: {
                'routines.medicineName': 1,
                'routines.medicineType': 1,
                'routines.medicineDosage': 1,
                'routines.medicineDosageUnit': 1,
                'routines.timesOfDay': 1,
                'first_name': 1,
                'last_name': 1,
                'email': 1,
                'phone': 1,
                'shouldNotify': {
                    '$cond': {
                        'if': {
                            '$in': [
                                time,
                                "$routines.timesOfDay"
                            ]
                        },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $match: {
                'shouldNotify': true,
                'routines.medicineStartTime': { $lte: currentdate.getDate() },
                'routines.medicineEndTime': { $gte: currentdate.getDate() },
            }
        },
        {
            $project: {
                'routines.medicineName': 1,
                'routines.medicineType': 1,
                'routines.medicineDosage': 1,
                'routines.medicineDosageUnit': 1,
                'first_name': 1,
                'last_name': 1,
                'email': 1,
                'phone': 1
            }
        }
    ]);

    return notificationData
});

module.exports = remind;