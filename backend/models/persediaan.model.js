const mongoose = require("mongoose");

const persediaanSchema = mongoose.Schema({
  kategori: {
    type: String,
  },
  persediaanName: {
    type: String,
  },
  funcL: {
    type: String,
  },
  namaP: {
    type: String,
  },
  kuantitas: {
    type: Number,
  },
  satuan: {
    type: String,
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
