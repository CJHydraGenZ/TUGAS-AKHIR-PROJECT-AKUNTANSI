const express = require("express");
// const { validationResult } = require("express-validator");
const router = express.Router();
// const {
//   TambahData,
//   TambahDataPersediaan,
//   getData,
//   getAllData,
//   updateData,
//   deleteData,
//   getSPecData,
//   PostSPecData,
//   getAllDataPersediaan,
//   getAllDataPersediaanSpec,
//   updateDataPersediaan,
// } = require("../controllers/data.controllers");
const {
  TambahData,
  getAllData,
  getData,
  getSPecData,
  deleteData,
  updateData,
  PostSPecData,
} = require("../controllers/laba.rugi.controllers");
const {
  TambahDataPersediaan,
  getAllDataPersediaanSpec,
  updateDataPersediaan,
  deleteDataPersediaan,
  getAllDataPersediaan,
} = require("../controllers/persediaan.controllers");
const {
  runValidaton,
  validationTambahData,
  validationTambahDataPersediaan,
} = require("../validation/index");
const middleware = require("../middleware/middleware");

//?persediaan
router.post(
  "/persediaan",
  middleware,
  validationTambahDataPersediaan,
  TambahDataPersediaan
);
router.get("/persediaan", middleware, getAllDataPersediaan);
router.get("/persediaan/:funcL", middleware, getAllDataPersediaanSpec);
router.put("/persediaan/:upt", middleware, updateDataPersediaan);
router.delete("/persediaan/:upt", middleware, deleteDataPersediaan);
// router.get("/persediaan/:penjualan", middleware, getAllDataPersediaanSpec);
// router.get("/persediaan", middleware, getAllDataPersediaan);
//? laba rugi
router.post("/tambah", middleware, validationTambahData, TambahData);
router.get("/lb/:lb", middleware, getData);
router.get("/lb", middleware, getAllData);
router.get("/spec", middleware, getSPecData);
router.post("/spec", middleware, PostSPecData);
router.put("/lb/:up", middleware, updateData);
router.delete("/lb/:up", middleware, deleteData);

module.exports = router;
