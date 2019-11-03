const fs = require('fs');
const path = require('path');

exports.saveAudio = (req, res) => {
  let uploadLocation = path.join(__dirname, '../data/') + '/uploads/' + req.file.originalname;
  fs.writeFileSync(uploadLocation,Buffer.from(new Uint8Array(req.file.buffer)));
  res.sendStatus(200);
}

exports.playAudio = (req, res) => {
  let file = path.join(__dirname, '../data/') + '/playAudio/' + 'test.mp3';
  res.download(file)
}