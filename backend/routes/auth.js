const express = require("express");
const router = express.Router();

const {
    signup,
    adminSignup,
    signin,
    signout
} = require("../controllers/auth");
const { userSignupValidator, adminSignupValidator } = require("../validator");

console.log('REACHES ROUTES');
router.post("/signup", userSignupValidator, signup);
router.post("/adminSignup", adminSignupValidator, adminSignup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
