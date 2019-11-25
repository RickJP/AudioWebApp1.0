const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const glob = require('glob');
//const ffmpeg = require('ffmpeg');

exports.saveAudio = (req, res) => {
  const dir = req.params.dir;
  const file = req.params.file;
  const tPath = path.join(__dirname, '../data/') + 'uploads/' + dir + '/';
  const fullPathandFile = tPath + file + '.mp3';

  fs.existsSync(tPath) || fs.mkdirSync(tPath);
  fs.writeFileSync(
    fullPathandFile,
    Buffer.from(new Uint8Array(req.file.buffer))
  );

  //saveMP3Audio(tPath, file);
  res.sendStatus(200);
};

// path.parse(pathToCheck).base/name/ext
//   saveMP3Audio = (targetPath, file) => {

//   const wavFilePath = targetPath + file + '.wav';
//   const mp3FilePath = targetPath + file + '.mp3';

//   let process = new ffmpeg(wavFilePath);
//   process.then(audio => {
//     audio.fnExtractSoundToMP3(mp3FilePath, (error, file) => {
//       if (!error) {
//         console.log('Audio file ' + file);
//         removeWavFile(wavFilePath);
//       } else {
//         console.log(error);
//       }
//     }, err => {
//       console.log('Error:  ' + err);
//     });
//   });
// };

//   removeWavFile = (path) => {
//   fs.unlink(path, (err) => {
//     if (err) return console.log(err);
//     console.log('File successfully deleted');
//   });

// };

exports.playAudio = (req, res) => {
  try {
    const testNo = req.params.testNo;
    const file = req.params.file;

    
    const tFile =
      path.join(__dirname, '../data/', 'playAudio/', testNo, file);
    if (fs.existsSync(tFile)) {
      console.log(`PATH ${tFile} EXISTS`);
      res.download(tFile);
    }
  } catch (err) {
    console.error(err);
  }
};


const getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

exports.getAudioList = (req, res) => {
  const pathToSearch = 'data/uploads';
  getDirectories(pathToSearch, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};


exports.getAudioFiles = (req, res) => {
  try {
    const tFile =
      path.join(__dirname, '../data/') + 'uploads/' + req.params.dir+ '/' + req.params.file;
    console.log('#########' + tFile + '###########');
    if (fs.existsSync(tFile)) {
      console.log(`PATH ${tFile} EXISTS`);
      res.download(tFile);
    }
  } catch (err) {
    console.error(err);
  }
};

exports.saveRecordingsList = (req, res, next) => {
  const user_Id = req.params.userId;
  const ul_Folder = req.params.dir;
  const file = req.params.file + '.mp3';
  console.log(`userId: ${user_Id}  ulFolder: ${ul_Folder} file: ${file}`);

  const query = {_id: user_Id};
  const update = {$set: {ulFolder: ul_Folder}, $push: {recordings: file}};

  User.findOneAndUpdate(query, update, {new: true})
  .catch(err => {
    console.log(err);
  });

  next();
};
