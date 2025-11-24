const express = require("express");
const depositController = require("./../controllers/depositController");

const router = express.Router();

router.route("/").post(depositController.depositCash);


module.exports = router;
