const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const controlsSchema = new mongoose.Schema(
    {
        tasksActive: {
          type: Array,
          default: [true, true]
        },

        registerDisabled: {
          type: Boolean,
          default: false
        },
        loginDisabled: {
          type: Boolean,
          default: false
        },
        adminId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Controls", controlsSchema);
