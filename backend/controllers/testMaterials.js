const TestMaterials = require('../models/testMaterials');
const {errorHandler} = require('../helpers/dbErrorHandler');

exports.saveTestMaterials = (req, res) => {
  const materials = new TestMaterials(req.body);
  materials.save((err, materials) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      materials,
    });
  });
};

exports.displayAllTestMaterials = (req, res) => {
  const query = {};
  const includedFields = 'taskNo tasks fileNames';

  TestMaterials.find(query, includedFields).exec((err, materials) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.send(materials);
  });
};
