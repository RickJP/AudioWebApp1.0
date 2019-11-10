const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg');

exports.saveAudio = (req, res) => {
  const dir = req.params.dir;
  const file = req.params.file;
  const tPath = path.join(__dirname, '../data/') + 'uploads/' + dir + '/';
  const fullPathandFile = tPath + file + '.wav';

  fs.existsSync(tPath) || fs.mkdirSync(tPath)
  fs.writeFileSync(fullPathandFile, Buffer.from(new Uint8Array(req.file.buffer)));

  saveMP3Audio(tPath, file);
  res.sendStatus(200);
}

  // path.parse(pathToCheck).base/name/ext 
  saveMP3Audio = (targetPath, file) => {
  
  const wavFilePath = targetPath + file + '.wav';
  const mp3FilePath = targetPath + file + '.mp3';

  let process = new ffmpeg(wavFilePath);
  process.then(audio => {
    audio.fnExtractSoundToMP3(mp3FilePath, (error, file) => {
      if (!error) {
        console.log('Audio file ' + file);
        removeWavFile(wavFilePath);
      } else {
        console.log(error);
      }
    }, err => {
      console.log('Error:  ' + err);
    })
  });
}

  removeWavFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) return console.log(err);
    console.log('File successfully deleted');
  })
}


exports.playAudio = (req, res) => {
  try {
    const tFile = path.join(__dirname, '../data/') + 'playAudio/' + req.params.file;
    if (fs.existsSync(tFile)) {
      
      console.log(`PATH ${tFile} EXISTS`);
      res.download(tFile)
    }
  } catch(err) {
    console.error(err)
  }
  
}
