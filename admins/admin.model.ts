import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

adminSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified || !this.isNew) {
    next();
  } else this.isModified("password");
  if (this.password) this.password = bcrypt.hashSync(String(this.password), 12);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
