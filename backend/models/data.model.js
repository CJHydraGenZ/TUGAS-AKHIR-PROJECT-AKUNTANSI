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

  total: {
    type: Number,
  },
});

module.exports = mongoose.model("Data", dataSchema);
