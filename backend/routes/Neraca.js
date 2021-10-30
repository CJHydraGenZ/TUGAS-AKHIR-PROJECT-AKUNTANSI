const express = require("express");
// const { validationResult } = require("express-validator");
const router = express.Router();
const {
  TambahData,
  getData,
  getAllData,
  updateData,
  deleteData,
  getSPecData,
  PostSPecData,
} = require("../controllers/data.controllers");
const { runValidaton, validationTambahData } = require("../validation/index");
const middleware = require("../middleware/middleware");

router.post("/neraca", middleware, validationTambahData, TambahData);

router.get("/neraca/:lb", middleware, getData);
router.get("/neraca", middleware, getAllData);
router.get("/spec", middleware, getSPecData);
router.post("/spec", middleware, PostSPecData);
router.put("/lb/:up", middleware, updateData);
router.delete("/lb/:up", middleware, deleteData);

module.exports = router;
