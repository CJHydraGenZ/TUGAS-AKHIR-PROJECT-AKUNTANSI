const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  funcL: {
    type: String,
  },
  item: {
    type: String,
  },
  jumlahHarga: {
    type: Number,
  },
  tanggal: {
    type: Date,
  },
  tahun: {
    type: String,
  },
  bulan: {
    type: String,
  },
});

module.exports = mongoose.model("Data", dataSchema);
