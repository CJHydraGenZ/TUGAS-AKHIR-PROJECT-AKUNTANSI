const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  funcL: {
    type: String,
  },
  item: {
    type: String,
  },
  jumlah: {
    type: Number,
  },
  tanggal: {
    type: Date,
  },
  tahun: {
    type: String,
  },
});

module.exports = mongoose.model("Neraca", dataSchema);
