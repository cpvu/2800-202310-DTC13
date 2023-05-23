// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: String,
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: String,
//   resetToken: String,
  
// });

// userSchema.statics.findOneByUsername = function (username) {
//   return this.findOne({ username });
// };

// export const User = mongoose.model("User", userSchema);
// // const User = mongoose.model("User", userSchema);
// // export default User





import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  resetToken: String,
});


const User = mongoose.model("User", userSchema);
export default User;
