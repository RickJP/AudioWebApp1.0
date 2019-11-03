const fs = require('fs');
const path = require('path');

exports.saveAudio = (req, res) => {
  const dir = req.params.dir;
  const file = req.params.file + '.wav';
  const tPath = path.join(__dirname, '../data/') + '/uploads/' + dir;

  fs.existsSync(tPath) || fs.mkdirSync(tPath)

  let uploadLocation = tPath + '/' + file;
  fs.writeFileSync(uploadLocation,Buffer.from(new Uint8Array(req.file.buffer)));
  res.sendStatus(200);
}

exports.playAudio = (req, res) => {
  try {
    const tFile = path.join(__dirname, '../data/') + '/playAudio/' + req.params.file;
    if (fs.existsSync(tFile)) {
      
      console.log(`PATH ${tFile} EXISTS`);
      res.download(tFile)
    }
  } catch(err) {
    console.error(err)
  }
  
}
