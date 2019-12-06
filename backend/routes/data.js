const express = require("express");
const router = express.Router();

const { saveFile } = require('../controllers/data');


router.post('/saveFile', saveFile);
  

module.exports = router;