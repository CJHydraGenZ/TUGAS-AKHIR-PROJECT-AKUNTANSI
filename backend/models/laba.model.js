const mongoose = require("mongoose");

const labaSchema = mongoose.Schema({
  userId: String,
  data: {
    type: Object,
  },

  waktu_get: {
    type: Date,
  },
});

module.exports = mongoose.model("Laba", labaSchema);
