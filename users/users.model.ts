import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
    },
    diseases:{
        type:Array,
        default:[]
    }
});

userSchema.pre("save", async function (next:any) {
    if (!this.isModified || !this.isNew) {
        next();
    } else this.isModified("password");
    if (this.password) this.password = bcrypt.hashSync(String(this.password), 12);
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
