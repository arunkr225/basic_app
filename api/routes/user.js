const express = require("express");
const router = express.Router();
const { validate } = require('../middleware/checkAuth');
const userController = require('../controllers/user');

router.post("/", userController.createUser);
router.get("/", validate, userController.getUser);
router.post("/login", userController.login);

module.exports = router;
