require("dotenv").config();
const Trip = require("../model/Trip");

let add = async (req, res) => {
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
  } = req.body;

  if (trip_name && person1_deposit && person1_name) {
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
  try {
    let page;
    let limit;
    page = parseInt(req.query.page) || 1;
    limit = parseInt(req.query.limit) || 10;
    let currentPage = page;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};
    result.page;
    result.currentPage = currentPage;
    const length = await Trip.countDocuments().exec();
    result.total_count = length;
    result.total_pages = Math.ceil(length / limit);
    if (result.total_pages < page) {
      result.msg = "Page Number exceeds limit!";
      return res.send(result);
    }
    if (endIndex < length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      result.results = await Trip.find(
        {},
        {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        }
      )
        .limit(limit)
        .skip(startIndex);
      res.paginatedResult = result;
      return res.send(result);
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

let getTrip = async (req, res) => {
  try {
    const result = await Trip.findById(trip_id);
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
  try {
    const update = await Trip.findByIdAndUpdate(
      trip_id,
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
  } catch (error) {
    res.json({
      success: false,
      msg: `Error occurred`,
      error,
    });
  }
};

let deleteTrip = async (req, res) => {
  try {
    const deleteOp = await Trip.findByIdAndDelete(trip_id);
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
