const fs = require('fs');
const path = require('path');

exports.saveAudio = (req, res) => {
  let uploadLocation = path.join(__dirname, '../') + '/uploads/' + req.file.originalname;
  fs.writeFileSync(uploadLocation,Buffer.from(new Uint8Array(req.file.buffer)));
  res.sendStatus(200);
}