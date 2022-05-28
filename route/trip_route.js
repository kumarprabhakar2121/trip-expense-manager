const express = require("express");
const router = express.Router();

var tripCtrl = require("../controller/tripCtrl");

router.route("/").post(tripCtrl.add).get(tripCtrl.getAllTrips);

router
  .route("/:trip_id")
  .get(tripCtrl.getTrip)
  .put(tripCtrl.update)
  .delete(tripCtrl.deleteTrip);

module.exports = router;
