require("dotenv").config();
const Data = require("../models/data.model");
const Laba = require("../models/laba.model");

const { data_laba_rugi, dataGraf } = require("../functions/data_laba_rugi");

exports.TambahData = async (req, res) => {
  const { funcL, item, jumlahHarga, tanggal } = req.body;
  // console.log("tahun", new Date().getFullYear());

  const months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];
  const tahun = new Date(tanggal).getFullYear().toString();
  // console.log("tanggal", new Date(tanggal).getFullYear().toString());
  const bulan = new Date(tanggal).getMonth();
  // console.log(months[bulan]);
  const data = new Data({
    funcL,
    item,
    jumlahHarga,
    tanggal,
    tahun,
    bulan: months[bulan],
  });
  data.save();
  return res.status(201).json({
    status: true,
    msg: "Berasil di Tambah",
    code: "add",
  });
};

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
  return res.status(200).json({
    status: true,
    msg: "berhasil di Hapus",
    code: "delete",
  });
};
exports.getAllData = async (req, res) => {
  const months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];
  const tahun = new Date().getFullYear().toString();
  const bulan = new Date().getMonth();
  const data = await Data.find();
  const dataDasboard = await Data.find({ tahun, bulan: months[bulan] });
  const LData = data_laba_rugi(data);
  // const dasboard = data_laba_rugi(dataDasboard);
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: LData,
  });
};
exports.getGraf = async (req, res) => {
  // console.log(req.params.lb);
  const data = await Data.find();
  const LData = dataGraf(data);
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: LData,
  });
};

exports.getData = async (req, res) => {
  console.log(req.params.lb);
  const data = await Data.find({ funcL: `${req.params.lb}` });
  return res.status(200).json({
    status: true,
    msg: "berhasil",
    data: data,
  });
};

exports.getSPecData = async (req, res) => {
  const months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];
  const tahun = new Date().getFullYear().toString();
  const bulan = new Date().getMonth();
  const data = await Data.find({ tahun, bulan: months[bulan] });
  // const data = await Data.find({ tahun });
  const LData = data_laba_rugi(data);
  const laba = new Laba({
    userId: req.id,
    data: LData,
    waktu_get: Date.now(),
  });
  laba.save();
  return res.status(200).json({
    status: true,
    msg: "Get All Data Success",
    data: LData,
  });
};

exports.PostSPecData = async (req, res) => {
  const { awal, akhir } = req.body;

  console.log("ini awal", awal, "inni akhir", akhir);
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
      data: LData,
      waktu_get: akhir,
    });
    laba.save();

    return res.status(200).json({
      status: true,
      msg: "Get Specific Data Success",
      data: LData,
    });
  }
};
