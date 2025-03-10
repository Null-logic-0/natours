const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  getTourStats,
  updateTour,
  deleteTour,
  aliasTopTours,
  getToursWithin,
  getMonthlyPlan,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.route("/top-5-cheap").get(aliasTopTours, getAllTours);
router.route("/tour-stats").get(getTourStats);
router
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guides"), getMonthlyPlan);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

router
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(
    protect,
    restrictTo("admin", "lead-guide"),
    uploadTourImages,
    resizeTourImages,
    updateTour,
  )
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

// POST /tour/id/reviews
// GET /tour/id/reviews
// GET /tour/id/reviews/id

// router
//   .route("/:tourId/reviews")
//   .post(protect, restrictTo("user"), createReview);

router.use("/:tourId/reviews", reviewRouter);

module.exports = router;
