const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { saveAudio } = require('../controllers/audio');

router.post('/upload', upload.single('soundBlob'), saveAudio)

module.exports = router;
