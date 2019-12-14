const express = require("express");
const router = express.Router();

const { saveTestMaterials, displayAllTestMaterials } = require("../controllers/testMaterials");

router.post('/testmaterials', saveTestMaterials)
router.get('/allTestMaterials', displayAllTestMaterials)

module.exports = router;
