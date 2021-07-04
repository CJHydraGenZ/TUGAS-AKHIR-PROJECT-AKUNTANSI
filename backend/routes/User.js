const express = require("express");
// const { validationResult } = require("express-validator");
const router = express.Router();
const {
  DaftarUser,
  LoginUser,
  getSingleUser,
} = require("../controllers/user.controllers");
const {
  runValidaton,
  validationDaftar,
  validationLogin,
} = require("../validation/index");
const middleware = require("../middleware/middleware");

router.post("/daftar", validationDaftar, runValidaton, DaftarUser);
router.post("/login", validationLogin, runValidaton, LoginUser);
router.get("/user", middleware, getSingleUser);

module.exports = router;
