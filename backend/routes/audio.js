const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { playAudio, saveAudio } = require('../controllers/audio');

router.post('/upload/:dir/:file', upload.single('soundBlob'), saveAudio);
router.get('/playAudio/:file', playAudio);

module.exports = router;

