const mongoose = require("mongoose");

const labaSchema = mongoose.Schema({
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

module.exports = mongoose.model("Laba", labaSchema);
