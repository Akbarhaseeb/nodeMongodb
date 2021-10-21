var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var restuarant = new Schema({
  borough: String,
  cuisine: String,
  name: String,
  restaurant_id: String,
  address: {
    building: String,
    street: String,
    zipcode: String,
    coord: [Number],
  },

  grades: [
    {
      date: Date,
      grade: String,
      score: Number,
    },
  ],
});
module.exports = mongoose.model("restaurants", restuarant);
