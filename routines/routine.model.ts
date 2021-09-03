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
    type: String,
    required: true,
  },
  medicineDosageUnit: {
    // tablets, capsules, ml, times, drops
    type: String,
    required: true,
  },
  medicineFrequency: {
    // times a day, times a week, times a month
    type: String,
    required: true,
  },
  medicineFrequencyUnit: {
    // days, weeks, months
    type: String,
    required: true,
  },
  medicineStartTime: {
    type: Number,
    required: true,
  },
  medicineEndTime: {
    type: Number,
    required: true,
  },
});

const Routine = mongoose.model("Routine", routineSchema);

export default Routine;
