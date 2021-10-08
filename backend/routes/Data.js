const express = require("express");
// const { validationResult } = require("express-validator");
const router = express.Router();
const {
  TambahData,
  getData,
  getAllData,
  updateData,
  deleteData,
} = require("../controllers/data.controllers");
const { runValidaton, validationTambahData } = require("../validation/index");
const middleware = require("../middleware/middleware");

router.post("/tambah", middleware, validationTambahData, TambahData);

router.get("/lb/:lb", middleware, getData);
router.get("/lb", middleware, getAllData);
router.put("/lb/:up", middleware, updateData);
router.delete("/lb/:up", middleware, deleteData);

module.exports = router;
