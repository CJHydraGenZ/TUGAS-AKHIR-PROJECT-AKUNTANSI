const mongoose = require("mongoose");

const labaSchema = mongoose.Schema({
  userId: String,
  laba_rugi: {
    type: Object,
  },
  neraca: {
    type: Array,
  },
  lap_keuangan: {
    type: Array,
  },
  waktu_get: {
    type: Date,
  },
});

module.exports = mongoose.model("Laba", labaSchema);
