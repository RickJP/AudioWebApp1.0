const Controls = require('../models/controls');

const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const {errorHandler} = require('../helpers/dbErrorHandler');



exports.createControls = (req, res) => {
  
  const adminId = {adminId: req.params.adminId};
  console.log(adminId);
  const controls = new Controls(adminId);
  controls.save((err, controls) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      controls,
    });
  });
};

exports.updateControls = (req, res) => {
   return res.json({ status: success });
  // const adminId = req.body.params;
  // console.log(adminId);
  // const controls = new Controls(data);
  // controls.save((err, controls) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: errorHandler(err),
  //     });
  //   }
  //   res.json({
  //     controls,
  //   });
  // });
};

exports.getControls = (req, res) => {
  const adminId = req.params.adminId;
  Controls.find({adminId}, (err, controls) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      controls,
    });
  });
};


exports.getAllControls = (req, res) => {
  Controls.find({}, (err, controls) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      controls,
    });
  });
};