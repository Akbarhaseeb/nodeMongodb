const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var mongoose = require("mongoose");
const resModel = require("./model");
const path = require("path");
///MOngog DB Connection
var mongoDB =
  // "mongodb+srv://Requin:Requin@cluster0.0vcok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  "mongodb+srv://haseeb213:Mardan221133@cluster0.hsmkz.mongodb.net/sample_restaurants?retryWrites=true&w=majority";

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//  Add Resturant
app.post("/add", (req, res) => {
  const { restaurant_id, building, street, zipcode, name } = req.body;
  const address = { building, street, zipcode };
  console.log(req.body);
  const resta = new resModel({ restaurant_id, address, name });
  try {
    resta.save().then((data) => {
      res.send(data);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//For Delete The Specific Resturant
app.post("/delete", (req, res) => {
  resModel.findOneAndRemove(
    { restaurant_id: req.body.restaurant_id },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.json("Resturant Delete Succefully");
        console.log("Removed  Resturant: ", docs);
      }
    }
  );
});

//For Update The Specific Resturant
app.post("/Update", (req, res) => {
  resModel
    .findOneAndUpdate(
      { restaurant_id: req.body.restaurant_id },
      {
        $set: {
          address: {
            building: req.body.building,
            street: req.body.street,
            zipcode: req.body.zipcode,
          },
          name: req.body.name,
        },
      },
      {
        upsert: true,
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => console.error(error));
});

app.post("/search", (req, res) => {
  resModel
    .find({ restaurant_id: req.body.restaurant_id })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => console.error(error));
});

app.listen(3000, function () {
  console.log("listening on 3000");
});
