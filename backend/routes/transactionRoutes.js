const express = require("express");
const transactionController = require("./../controllers/transactionController");

const router = express.Router();

router.route("/:user_id").get(transactionController.viewTransactionHistory);

module.exports = router;
