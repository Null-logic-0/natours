const express = require("express");
const {
  getAllUsers,
  updateMe,
  deleteMe,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("../controllers/userController");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/users/resetPassword/:token", resetPassword);

router.use(protect);
router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
