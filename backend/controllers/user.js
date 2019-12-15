const User = require("../models/user");

exports.getAllUsers = (req, res) => {
    const query = { role: {$ne: 1 }};
    const includedFields = 'name studentNo classNo createdAt updateAt ulFolder recordings';

    User.find(query, includedFields).exec((err, users) => {
        // let theUsers = {};

        // users.forEach((user, idx) => {
        //     theUsers[idx] = user;
        // });
        res.send(users);
    });
};

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};


exports.setTaskCompleted =  (req, res) => {
    const userId = req.params.userId;
    const taskNo = req.params.taskNo;

    console.log(userId, taskNo);
    res.json(userId, taskNo);
    // User.findOneAndUpdate(
    //     { _id: req.profile._id },
    //     { $set: req.body },
    //     { new: true },
    //     (err, user) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 error: "You are not authorized to perform this action"
    //             });
    //         }
    //         user.hashed_password = undefined;
    //         user.salt = undefined;
    //         res.json(user);
    //     }
    // );
}