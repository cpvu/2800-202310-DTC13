import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  resetToken: String,
  records: [{"record": String}]
});

export const User = mongoose.model("User", userSchema);
