const express = require("express");
const userController = require("./../controllers/userController");

const router = express.Router();

router.route("/addUser").post(userController.createUser);

router
  .route("/")
  .get(userController.getAllUsers)

  router
  .route('/:edittedUserId')
  .put(
    userController.updateUserDetails
  );
  
  router
  .route('/:detailsId')
  .get(
    userController.getUserRelatedTableRecords
  );

module.exports = router;
