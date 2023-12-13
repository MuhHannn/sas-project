const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

let UserModel;
// fix overwrite user
if (mongoose.models.User) {
  UserModel = mongoose.model("User");
} else {
  UserModel = mongoose.model("User", userSchema);
}

export default UserModel;
