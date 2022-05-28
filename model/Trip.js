const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    trip_name: {
      type: String,
      required: [true, "Please provide a trip_name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    date: {
      type: Date,
      default: new Date().toISOString(),
    },
    person1_name: {
      type: String,
    },
    person2_name: {
      type: String,
    },
    person3_name: {
      type: String,
    },
    person4_name: {
      type: String,
    },
    person5_name: {
      type: String,
    },
    person6_name: {
      type: String,
    },
    person1_deposit: {
      type: Number,
    },
    person2_deposit: {
      type: Number,
    },
    person3_deposit: {
      type: Number,
    },
    person4_deposit: {
      type: Number,
    },
    person5_deposit: {
      type: Number,
    },
    person6_deposit: {
      type: Number,
    },
    total_no_of_person: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
/* 
trip_name
desc
date
person1-6 name
person1-6 deposit amount
*/
