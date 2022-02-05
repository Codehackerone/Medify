import mongoose from "mongoose";
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medicineName: {
    type: String,
    required: true,
  },
  medicineType: {
    // Tablet, Capsule, Syrup, Cream, Drops, Injection
    type: String,
    required: true,
  },
  medicineDosage: {
    //How much or how many? (numerical value)
    type: String,
    required: true,
  },
  medicineDosageUnit: {
    // tabs, mg, drops, ml, etc
    type: String,
    required: true,
  },
  medicineFrequency: {
    // times a day, times a week, times a month (numerical value)
    type: String,
    required: true,
  },
  medicineFrequencyUnit: {
    // days, weeks, months
    type: String,
    required: true,
  },
  medicineStartTime: {
    //day which the medication starts
    type: Number,
    required: true,
  },
  medicineEndTime: {
    //day which the medication ends
    type: Number,
    required: true,
  },
  timesOfDay: [{
    //times in a day when medicine needs to be taken
    type: String,
    required: true
}],
});

const Routine = mongoose.model("Routine", routineSchema);

export default Routine;