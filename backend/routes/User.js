const express = require("express");
// const { validationResult } = require("express-validator");
const router = express.Router();
const {
  DaftarUser,
  LoginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");
// const { TambahData, getData } = require("../controllers/data.controllers");
const {
  runValidaton,
  validationDaftar,
  validationLogin,
  validationTambahData,
} = require("../validation/index");
const middleware = require("../middleware/middleware");

//user
router.post("/daftar", validationDaftar, middleware, runValidaton, DaftarUser);
router.post("/login", validationLogin, runValidaton, LoginUser);
router.put("/user/:uid", middleware, updateUser);
router.delete("/user/:uid", middleware, deleteUser);
router.get("/user", middleware, getUser);

// //data
// router.post("/tambah", validationTambahData, TambahData);

// router.get("/lb", middleware, getData);

module.exports = router;
