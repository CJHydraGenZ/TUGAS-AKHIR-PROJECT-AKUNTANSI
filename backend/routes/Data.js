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
  getGraf,
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
  getSaldo,
  getPSPecData,
  PostPSPecData,
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
router.get("/persediaann/:funcL", middleware, getSaldo);
router.put("/persediaan/:upt", middleware, updateDataPersediaan);
router.delete("/persediaan/:upt", middleware, deleteDataPersediaan);
router.get("/Pspec/:p", middleware, getPSPecData);
router.post("/Pspec/:p", middleware, PostPSPecData);
// router.get("/persediaan/:penjualan", middleware, getAllDataPersediaanSpec);
// router.get("/persediaan", middleware, getAllDataPersediaan);
//? laba rugi
router.post("/tambah", middleware, validationTambahData, TambahData);
router.get("/lb/:lb", middleware, getData);
router.get("/lb", middleware, getAllData);
router.get("/graf", middleware, getGraf);
router.get("/spec", middleware, getSPecData);
router.post("/spec", middleware, PostSPecData);
router.put("/lb/:up", middleware, updateData);
router.delete("/lb/:up", middleware, deleteData);

module.exports = router;
