const cron = require('node-cron');
const Routine = require('../models/routine.model');

// run a cron job every minute
cron.schedule('* * * * *', async () => {
    console.log('running a task every minute');

    // Since I did not know about the time format I return medicines between the start and end time
    const drugsToBeNotified = await Routine.aggregate([
        {
            "$match": {
                //matching the current time with the start and end time of the medicine
                "medicineStartTime": {
                    "$lte": new Date().getTime()
                },
                "medicineEndTime": {
                    "$gte": new Date().getTime()
                }
            }
        },
        {
            //returning details relevant to notifying the user
            "$project": {
                "user_id": 1,
                "medicineName": 1,
                "medicineType": 1,
                "medicineDosage": 1,
                "medicineDosageUnit": 1,
            }
        }
    ]);
});
