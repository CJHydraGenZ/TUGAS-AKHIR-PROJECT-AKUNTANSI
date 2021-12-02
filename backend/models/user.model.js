const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nama: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  userlevel: {
    type: String,
  },
  password: {
    type: String,
  },
  jenis_kelamin: {
    type: String,
  },
  alamat: {
    type: String,
  },
  last_login: {
    type: Date,
  },

  status: {
    type: Boolean,
  },
  createAt: {
    type: Date,
    // default: () => Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
