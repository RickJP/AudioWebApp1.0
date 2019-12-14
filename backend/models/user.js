const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        studentNo: {
            type: Number,
            trim: true,
            required: true,
            min: [1, 'Too few'],
            max: [50, 'Too many']
        },
        classNo: {
            type: Number,
            trim: true,
            required: true,
            min: [1, 'Too few'],
            max: [16, 'Too many']
        },
        isLoggedIn: {
            type: Boolean,
            default: false
        },

        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        ulFolder: {
            type: String,
            default: ''
        },
        recordings: {
            type: Array,
            default: []
        },
        tasksEnabled: {
            type: Array,
            default: [true, true]
        },
        tasksCompleted: {
            type: Array,
            default: [],
        },
        allowLogin: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

userSchema.index({name:1, classNo:1, studentNo:1}, { unique: true });

// virtual field
userSchema
    .virtual("password")
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);
