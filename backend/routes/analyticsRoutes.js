const express = require("express");
const analyticsController = require("../controllers/analyticsController");

const router = express.Router();

router.route("/totalUsers").get(analyticsController.totalUsers);
router.route("/totalWalletsValue").get(analyticsController.totalWalletsValue);
router.route("/totalTransfers").get(analyticsController.totalTransfers);
router.route("/totalWithdraws").get(analyticsController.totalWithdraws);


module.exports = router;
