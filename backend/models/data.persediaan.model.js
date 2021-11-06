const mongoose = require("mongoose");
// {
//     "beras_putih": {
//         "penjualan": [
//             {
//                 "_id": "61861e6523729d45f868a661",
//                 "persediaanName": "beras_putih",
//                 "funcL": "penjualan",
//                 "kuantitas": 2000,
//                 "harga": 9000,
//                 "tanggal": "2021-11-29T14:30:19.000Z",
//                 "tahun": "2021",
//                 "jumlah": 18000000,
//                 "__v": 0
//             }
//         ],
//         "pembelian": [
//             {
//                 "_id": "61861e9023729d45f868a665",
//                 "persediaanName": "beras_putih",
//                 "funcL": "pembelian",
//                 "kuantitas": 5000,
//                 "harga": 9000,
//                 "tanggal": "2021-11-29T14:30:19.000Z",
//                 "tahun": "2021",
//                 "jumlah": 45000000,
//                 "__v": 0
//             }
//         ]
//     }
// }
const data_persediaanSchema = mongoose.Schema({
  persediaanData: {
    type: [],
  },
});

module.exports = mongoose.model("DataPersediaan", data_persediaanSchema);
// const persediaan = {
//     persediaanName: {
//       type: String,
//     },
//     funcL: {
//       type: String,
//     },
//     kuantitas: {
//       type: Number,
//     },
//     harga: {
//       type: Number,
//     },
//     tanggal: {
//       type: Date,
//     },
//     tahun: {
//       type: String,
//     },
//     jumlah: {
//       type: Number,
//     },
//   };
//   const data = {
//     persediaanName: {
//       penjualan: [persediaan],
//       pembelian: [persediaan],
//     },
//   };
//   const data_persediaanSchema = mongoose.Schema({
//     persediaanData: [data],
//   });
