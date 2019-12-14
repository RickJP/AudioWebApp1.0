const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { playAudio, saveAudio, getFileNames, getSizeOfAllFiles, getAudioFiles, saveRecordingsList, getAudioList, uploadFile  } = require('../controllers/audio');

const {
  userById,
  read,
  update
} = require("../controllers/user");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get('/getaudiolist', getAudioList);
router.get('/audiofilenames', getFileNames);
router.get('/sizeofallfiles', getSizeOfAllFiles);

router.get('/getaudiofiles/:dir/:file', getAudioFiles);

router.post('/upload/:userId/:userDir/:file', isAuth, upload.single('soundBlob'), saveRecordingsList, saveAudio );
router.get('/playAudio/:taskNo/:file', playAudio);

router.post('uploadFile', uploadFile);

router.param("userId", userById);

module.exports = router;

