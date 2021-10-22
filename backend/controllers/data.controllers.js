require("dotenv").config();
const Data = require("../models/data.model");
const Laba = require("../models/laba.model");
const { data_laba_rugi } = require("../functions/data_laba_rugi");

exports.TambahData = async (req, res) => {
  const { funcL, item, jumlahHarga, tanggal } = req.body;

  const data = new Data({
    funcL,
    item,
    jumlahHarga,
    tanggal,
  });
  data.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
    code: "add",
  });
};
// const user = await User.findOne({ _id: req.id });

exports.updateData = async (req, res) => {
  console.log(req.params.up);
  const { funcL, item, jumlahHarga, tanggal } = req.body;
  const data = await Data.findByIdAndUpdate(
    { _id: `${req.params.up}` },
    {
      $set: {
        item: item,
        jumlahHarga: jumlahHarga,
        tanggal: tanggal,
      },
    },
    { useFindAndModify: false },
    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );
  // console.log(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil di Update",
    data: data,
    code: "update",
  });
};
exports.deleteData = async (req, res) => {
  console.log(req.params.up);
  // const { funcL, item, jumlahHarga, total } = req.body;
  const data = await Data.findByIdAndRemove(
    { _id: `${req.params.up}` },

    (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log("delete User : ", docs);
      }
    }
  );
  // console.log(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil di Hapus",
    code: "delete",
  });
};
exports.getAllData = async (req, res) => {
  // console.log(req.params.lb);
  const data = await Data.find();
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

// exports.getData = async (req, res) => {
//   console.log(req.params.lb);
//   const data = await Data.find({ funcL: `${req.params.lb}` });
//   return res.status(200).json({
//     status: true,
//     msg: "berhasil",
//     data: data,
//   });
// };

//? Udah Di dapat Algoritamnya
exports.getData = async (req, res) => {
  const { awal, akhir } = req.body;
  console.log(req.params.lb);

  const data = await Data.find({
    tanggal: {
      $gte: "2021-10-16T16:00:00.000+00:00", //! bisa menggunakan pilihan
      $lt: "2021-12-30T16:00:00.000+00:00", //! pilihan aja
    },
  });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

exports.getSPecData = async (req, res) => {
  const { awal, akhir } = req.body;
  // console.log(req.params.lb);
  // console.log("ini awal", awal, "inni akhir", akhir);
  if (awal && akhir) {
    const data = await Data.find({
      tanggal: {
        $gte: `${awal}`, //! bisa menggunakan pilihan
        $lt: `${akhir}`, //! pilihan aja
      },
    });
    const LData = data_laba_rugi(data);
    // console.log("ini data", LData);

    const laba = new Laba({
      userId: req.id,
      laba_rugi: LData,
      waktu_get: akhir,
    });
    laba.save();

    return res.status(200).json({
      status: true,
      msg: "Get Specific Data Success",
      data: LData,
    });
  } else {
    const data = await Data.find();
    const LData = data_laba_rugi(data);

    const laba = new Laba({
      userId: req.id,
      laba_rugi: LData,
      waktu_get: akhir || Date.now(),
    });
    laba.save();

    return res.status(200).json({
      status: true,
      msg: "Get All Data Success",
      data: LData,
    });
  }
};
