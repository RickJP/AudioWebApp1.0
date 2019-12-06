exports.saveFile = (req, res) => {
  const file = req.params.file;
  const tPath = path.join(__dirname, '../data/') + 'uploadFile/';

  fs.existsSync(tPath) || fs.mkdirSync(tPath);
  fs.writeFileSync(
    fullPathandFile,
    Buffer.from(new Uint8Array(req.file.buffer))
  );
  res.sendStatus(200);
};