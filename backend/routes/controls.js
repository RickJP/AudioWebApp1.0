const express = require("express");
const router = express.Router();

const {
    createControls,
    updateControls,
    getControls,
    getAllControls
} = require("../controllers/controls");
const {
  userById,
} = require("../controllers/user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");


router.post("/controls/:adminId", requireSignin,  isAuth ,isAdmin,  createControls);
router.put("/controls/:adminId", requireSignin,  isAuth ,isAdmin,  updateControls);
router.get("/controls/:adminId", requireSignin,  isAuth ,isAdmin, getControls);
router.get("/controls/all/:adminId", requireSignin,  isAuth ,isAdmin, getAllControls);



router.param("adminId", userById);

module.exports = router;
