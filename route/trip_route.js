const express = require("express");
const router = express.Router();

var tripCtrl = require("../controller/tripCtrl");

router.route("/").post(tripCtrl.add);

router
  .route("/:trip_id")
  .get(tripCtrl.getTrip)
  .put(tripCtrl.update)
  .delete(tripCtrl.deleteTrip);

router.route("/list").get(tripCtrl.getAllTrips);

module.exports = router;
