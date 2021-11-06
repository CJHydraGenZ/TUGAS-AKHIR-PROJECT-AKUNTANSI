const { check, validationResult } = require("express-validator");

exports.runValidaton = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: false,
      msg: errors.array()[0].msg,
    });
  }
  next();
};

exports.validationDaftar = [
  check("username", "username tidak boleh kosong").notEmpty(),
  check("email", "email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("harus memasukan email "),
  check("userlevel", "harus di isi user level").notEmpty(),
  check("password", "password tidak boleh kosong")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password minimal 6 karakter"),
  // .isStrongPassword()
  // .withMessage("password harus terdiri dari simbol hurup besar dan angka"),
];

exports.validationLogin = [
  check("username", "username tidak boleh kosong").notEmpty(),

  check("password", "password tidak boleh kosong").notEmpty(),
];
exports.validationTambahData = [
  check("item", "nama item tidak boleh kosong").notEmpty(),
  check("jumlahHarga", "jumlah harga tidak boleh kosong").notEmpty(),
];

// funcL,
// kuantitas,
// harga,
// tanggal,
// tahun,
// jumlah,
exports.validationTambahDataPersediaan = [
  check("kuantitas", "kuantitas tidak boleh kosong").notEmpty(),
  check("harga", "jumlah harga tidak boleh kosong").notEmpty(),
  check("tanggal", "tidak bolek tidak boleh kosong").notEmpty(),
];
