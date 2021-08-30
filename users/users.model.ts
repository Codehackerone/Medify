const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
    },
    dateofBirth:{
        type:Number,
        required:true,
    },
    diseases:{
        type:Array,
        default:[]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};
