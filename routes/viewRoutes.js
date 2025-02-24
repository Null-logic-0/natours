const express = require("express");
const {
  getOverview,
  getTour,
  getLoginForm,
  getSignupForm,
  getAccount,
  getMyTours,
  updateUserData,
  getEmailConfirmForm,
} = require("../controllers/viewsController");
const { createBookingCheckout } = require("../controllers/bookingController");
const { protect, isLoggedIn } = require("../controllers/authController");

const router = express.Router();

router.use(isLoggedIn);

router.get("/", createBookingCheckout, getOverview);
router.get("/tour/:slug", protect, getTour);
router.get("/login", getLoginForm);
router.get("/signup", getSignupForm);
router.get("/account", getAccount);
router.get("/my-tours", protect, getMyTours);
router.get("/emailConfirm", getEmailConfirmForm);
// router.get("/resetPassword", getPasswordChangeForm);
router.post("/submit-user-data", updateUserData);

module.exports = router;
