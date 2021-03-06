require("dotenv").config();
const Trip = require("../model/Trip");
const mongoose = require("mongoose");

let add = async (req, res) => {
  console.log(req.body);
  const {
    trip_name,
    description,
    person1_name,
    person2_name,
    person3_name,
    person4_name,
    person5_name,
    person6_name,
    person1_deposit,
    person2_deposit,
    person3_deposit,
    person4_deposit,
    person5_deposit,
    person6_deposit,
    total_no_of_person,
  } = req.body;

  if (trip_name && person1_deposit && person1_name && total_no_of_person) {
    try {
      const addOperation = await Trip.create({
        trip_name,
        description,
        person1_name,
        person2_name,
        person3_name,
        person4_name,
        person5_name,
        person6_name,
        person1_deposit,
        person2_deposit,
        person3_deposit,
        person4_deposit,
        person5_deposit,
        person6_deposit,
        total_no_of_person,
      });
      if (addOperation) {
        //saved
        res.json({
          success: true,
          msg: `saved successfully`,
          data: addOperation,
        });
      } else {
        // error
        res.json({
          success: false,
          msg: `error saving to DB`,
        });
      }
    } catch (error) {
      res.json({
        success: false,
        msg: `Error occurred`,
        error,
      });
    }
  } else {
    return res.json({
      success: false,
      msg: "Enter required fields",
    });
  }
};

let getAllTrips = async (req, res) => {
  const result = await Trip.find(
    {},
    {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );
  res.json(result)
};

let getTrip = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.trip_id)) {
      return res.json({
        success: false,
        msg: `bad object id`,
      });
    }
    const result = await Trip.findById(req.params.trip_id);
    if (result) {
      res.json({
        success: true,
        msg: "Result found",
        result,
      });
    } else {
      res.json({
        success: false,
        msg: " Result not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: `Error occurred`,
      error,
    });
  }
};

let update = async (req, res) => {
  // try {
  const update = await Trip.findByIdAndUpdate(
    req.params.trip_id,
    {
      $set: req.body,
    },
    { new: true, runValidator: true }
  );
  if (update) {
    res.json({
      success: true,
      msg: "updated successfully",
      update,
    });
  } else {
    res.json({
      success: false,
      msg: " Result not found",
    });
  }
  // } catch (error) {
  //   res.json({
  //     success: false,
  //     msg: `Error occurred`,
  //     error,
  //   });
  // }
};

let deleteTrip = async (req, res) => {
  try {
    const deleteOp = await Trip.findByIdAndDelete(req.params.trip_id);
    if (deleteOp) {
      res.json({
        success: true,
        msg: "deleted successfully",
        deleted_doc: deleteOp,
      });
    } else {
      res.json({
        success: false,
        msg: " Result not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      msg: `Error occurred`,
      error,
    });
  }
};

module.exports = {
  add,
  deleteTrip,
  update,
  getAllTrips,
  getTrip,
};
