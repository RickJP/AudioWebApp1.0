const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { playAudio, saveAudio, getAudioFiles, saveRecordingsList, getAudioList, uploadFile  } = require('../controllers/audio');

const {
  userById,
  read,
  update
} = require("../controllers/user");

router.get('/getaudiolist', getAudioList);
router.post('/upload/:userId/:dir/:file', upload.single('soundBlob'), saveRecordingsList, saveAudio );
router.get('/playAudio/:testNo/:file', playAudio);
router.get('/getaudiofiles/:dir/:file', getAudioFiles);

router.post('uploadFile', uploadFile);

router.param("userId", userById);

module.exports = router;

