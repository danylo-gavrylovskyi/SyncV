const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/", userController.postUserController);
router.get("/", userController.getAllUsersController);
router.get("/:id", userController.getUserByIdController);
router.put("/:id", userController.putUserController);
router.delete("/:id", userController.deleteUserController);

module.exports = router;
