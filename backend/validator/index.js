exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    req.check("classNo", "Class Number is required")
       .notEmpty()
       .matches(/^([1-9]|1[0-5])$/)
       .withMessage("Enter a correct class number");
    req.check("studentNo", "Student Number is required").notEmpty()
       .matches(/^([1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9])$/)
       .withMessage("Enter a correct student number");

    
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    
    next();
};
