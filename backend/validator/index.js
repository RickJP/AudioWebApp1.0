

exports.userSignupValidator = (req, res, next) => {
    console.log(req.body.name)
    req.check("name", "Type your name, please").notEmpty();
    req.check("password", "Think of a password!").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("6 characters or more, please")
        .matches(/\d/)
        .withMessage("Type at least 1 number");
    req.check("classNo", "Type your class number, please")
       .notEmpty()
       .matches(/^([1-9]|1[0-5])$/)
       .withMessage("This class number is not correct");
    req.check("studentNo", "Type your student number, please").notEmpty()
       .matches(/^([1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9])$/)
       .withMessage("This student number is not correct");

    const errors = req.validationErrors();
    console.log(errors === true);
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};


// exports.adminSignupValidator = (req, res, next) => {
//     console.log('WILL VALIDATE ADMIN');
//     req.check("name", "Type your name, please").notEmpty();
//     req.check("password", "Think of a password!").notEmpty();
//     req.check("password")
//         .isLength({ min: 6 })
//         .withMessage("6 characters or more, please")
//         .matches(/\d/)
//         .withMessage("Type at least 1 number");

//     const errors = req.validationErrors();
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0];
//         return res.status(400).json({ error: firstError });
//     }
//     console.log('ADMIN VALIDATED');
//     next();
// };
