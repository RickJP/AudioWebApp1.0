const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const glob = require('glob');
//const ffmpeg = require('ffmpeg');
const IncomingForm = require('formidable').IncomingForm;

exports.saveAudio = (req, res) => {
  const userDir = req.params.userDir;
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


const getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

exports.getAudioList = (req, res) => {
  const pathToSearch = 'data/recordings';
  getDirectories(pathToSearch, function (err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};

exports.getFileNames = ((req, res) => {
  const dir = 'data/recordings';
  var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else {
        filelist.push(file);
      }
    });
    return res.send(filelist);
  };
  
});

exports.getSizeOfAllFiles = ((req, res) => {
  const directoryPath = 'data/recordings';
  (directoryPath) => {
    const arrayOfFiles = getAllFiles(directoryPath)
   
    let totalSize = 0
   
    arrayOfFiles.forEach(function(filePath) {
      totalSize += fs.statSync(filePath).size
    })
   
    res.send(totalSize);
  }
})


// exports.getFilesFromDir = (dir, fileTypes) => {
//   var filesToReturn = [];
//   function walkDir(currentPath) {
//     var files = fs.readdirSync(currentPath);
//     for (var i in files) {
//       var curFile = path.join(currentPath, files[i]);      
//       if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
//         filesToReturn.push(curFile.replace(dir, ''));
//       } else if (fs.statSync(curFile).isDirectory()) {
//        walkDir(curFile);
//       }
//     }
//   };
//   walkDir(dir);
//   return filesToReturn; 
// }



exports.getAudioFiles = (req, res) => {
  try {
    const tFile =
      path.join(__dirname, '../data/') + 'recordings/' + req.params.dir+ '/' + req.params.file;
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