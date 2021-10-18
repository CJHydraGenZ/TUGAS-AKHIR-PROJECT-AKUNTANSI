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
  tpu: {
    type: Number,
  },
  tbp: {
    type: Number,
  },
  bpeg: {
    type: Number,
  },
  bk: {
    type: Number,
  },
  bpen: {
    type: Number,
  },
  pl: {
    type: Number,
  },
  bl: {
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
