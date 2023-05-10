const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
});

module.exports = mongoose.model("Users", userSchema);

module.exports.getAllusers = async (req, res, nex) => {
  try {
    const users = "";
  } catch (ex) {
    nextTick(ex);
  }
};
