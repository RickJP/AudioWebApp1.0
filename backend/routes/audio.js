const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { playAudio, saveAudio, getFileLists, saveRecordingsList  } = require('../controllers/audio');

const {
  userById,
  read,
  update
} = require("../controllers/user");

router.post('/upload/:userId/:dir/:file', upload.single('soundBlob'), saveRecordingsList, saveAudio );
router.get('/playAudio/:file', playAudio);
router.get('/getFileLists', getFileLists);


router.param("userId", userById);

module.exports = router;

