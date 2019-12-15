const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const glob = require('glob');
//const ffmpeg = require('ffmpeg');
const IncomingForm = require('formidable').IncomingForm;

exports.saveAudio = (req, res) => {
  const userDir = req.params.userDir;
  console.log('######################');
  console.log('userDir is '+userDir);
  console.log('######################');
  const file = req.params.file;
  const tPath = path.join(__dirname, `../data/recordings/`) + userDir + '/';
  console.log(tPath);
  const fullPathandFile = tPath + file + '.mp3';

  fs.existsSync(tPath) || fs.mkdirSync(tPath);
  fs.writeFileSync(
    fullPathandFile,
    Buffer.from(new Uint8Array(req.file.buffer))
  );
  //saveMP3Audio(tPath, file);
  res.sendStatus(200);
};





exports.playAudio = (req, res) => {
  try {
    const taskNo = req.params.taskNo;
    const file = req.params.file;
    const tFile =
      path.join(__dirname, '../data/', 'playAudio/', taskNo, file);
    if (fs.existsSync(tFile)) {
      console.log(`PATH ${tFile} EXISTS`);
      res.download(tFile);
    }
  } catch (err) {
    console.error(err);
  }
};

const convertBytes = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
 
  if (bytes == 0) {
    return "n/a"
  }
 
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
 
  if (i == 0) {
    return bytes + " " + sizes[i]
  }
 
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i]
}


const getAllFilesHelper = function(dirPath, arrayOfFiles) {

  files = fs.readdirSync(dirPath)
 
  arrayOfFiles = arrayOfFiles || []
 
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFilesHelper(dirPath + "/" + file, arrayOfFiles)
    } else {
      file.split(".")[1] === 'mp3' ?  arrayOfFiles.push(dirPath + '/' + file) : null;
    }
  })
  return arrayOfFiles;
}

exports.getFileNames = ((req, res) => {
  res.send(getAllFilesHelper( path.join(__dirname, '../data/') + 'recordings'));
});



const getSizesOfAllFilesHelper = (dirPath) => {
  const arrayOfFiles = getAllFilesHelper(dirPath);
  console.log(arrayOfFiles);
  let totalSize = 0
 
  arrayOfFiles.forEach(function(filePath) {
    console.log(filePath);
    totalSize += fs.statSync(filePath).size
  })
  return convertBytes(totalSize);
}

exports.getSizesOfAllFiles = (req, res) => {
  res.send(getSizesOfAllFilesHelper(path.join(__dirname, '../data/') + 'recordings'));
};


exports.getAudioFiles = (req, res) => {
  try {
    const tFile =
      path.join(__dirname, '../data/') + 'recordings/' + req.params.dir+ '/' + req.params.file;
    if (fs.existsSync(tFile)) {
      res.download(tFile);
    }
  } catch (err) {
    console.error(err);
  }
};

const getDirectoriesHelper = function (src, callback) {
  glob(src + '/**/*', callback);
};


exports.getAudioList = (req, res) => {
  const pathToSearch = 'data/recordings';
  getDirectoriesHelper(pathToSearch, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      return res.status(200).send(data);
    }
  });
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

exports.uploadFile = (req, res) => {
  let form = new IncomingForm();

  form.on('file', (field, file) => {
    // Save file to db
    // Access it using file path
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};
