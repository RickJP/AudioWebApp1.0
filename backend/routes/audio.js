const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

//const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { playAudio, saveAudio, getFileNames, getSizesOfAllFiles, getAudioFiles, saveRecordingsList, getAudioList, uploadFile  } = require('../controllers/audio');

const {
  userById,
  setTaskCompleted
} = require("../controllers/user");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get('/audiolist', getAudioList);
router.get('/audiofiles/:dir/:file', getAudioFiles);
router.get('/audiofilenames', getFileNames);
router.get('/sizesofallfiles', getSizesOfAllFiles);




router.get('settaskcompleted', setTaskCompleted);



router.post('/upload/:userId/:userDir/:taskNo/:file', isAuth, upload.single('soundBlob'), saveRecordingsList, setTaskCompleted ,saveAudio );
router.get('/playAudio/:taskNo/:file', playAudio);

router.post('uploadFile', uploadFile);

router.param("userId", userById);

module.exports = router;

