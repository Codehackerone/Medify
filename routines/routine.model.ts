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
    //How many/much in one take.
    type: Number,
    required: true,
  },
  medicineDosageUnit: {
    // units, ml, mg etc
    type: String,
    required: true,
  },
  additionalInformation: {
    // units, ml, mg etc
    type: String,
  },
  medicineStartDate: {
    type: Number,
    required: true,
  },
  medicineEndData: {
    type: Number,
    required: true,
  },
  timesOfDay: [{
    type: String,
    required: true
}],
});

const Routine = mongoose.model("Routine", routineSchema);

export default Routine;
