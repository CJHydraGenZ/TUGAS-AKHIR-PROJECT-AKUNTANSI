const mongoose = require("mongoose");

const persediaanSchema = mongoose.Schema({
  funcL: {
    type: String,
  },
  kuantitas: {
    type: Number,
  },
  harga: {
    type: Number,
  },
  tanggal: {
    type: Date,
  },
  tahun: {
    type: String,
  },
  jumlah: {
    type: Number,
  },
});

module.exports = mongoose.model("Persediaan", persediaanSchema);
