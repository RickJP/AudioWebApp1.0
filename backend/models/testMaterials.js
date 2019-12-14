const mongoose = require("mongoose");

const testMaterialsSchema = new mongoose.Schema(
    {
        taskNo: {
          type: Number,
          required: true,
        },
        tasks: {
          type: [],
          required: true,
        },
        fileNames: {
          type: [],
          required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("TestMaterials", testMaterialsSchema);
