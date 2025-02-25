const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === "booking") res.locals.alert = "Your booking was successful!";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Create your account",
  });
};
exports.getEmailConfirmForm = (req, res) => {
  res.status(200).render("emailConfirm", {
    title: "Change  your password",
  });
};

exports.getPasswordChangeForm = (req, res) => {
  const { token } = req.params; // Extract token from the URL
  res.status(200).render("passwordReset", {
    title: "Change your password",
    token, // Pass the token to the frontend
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});
