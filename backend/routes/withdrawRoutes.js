const express = require("express");
const withdrawController = require("./../controllers/withdrawController");

const router = express.Router();

router.route("/").post(withdrawController.withdrawCash);


module.exports = router;
