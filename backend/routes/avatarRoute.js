const express = require("express");
const avatarController = require('../controllers/avatarController');
const router = express.Router();

router.post("/create", avatarController.avatarController);
router.post("/all", avatarController.getAllAvatars);

module.exports = router;