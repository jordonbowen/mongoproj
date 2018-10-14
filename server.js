// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
// Initialize Express
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// static dir
app.use(express.static("public"));

// Database with mongoose
mongoose.connect("mongodb://heroku_thdwtncq:v0db4jti38s60tnr86cs97bvvo@ds161483.mlab.com:61483/heroku_thdwtncq");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//Routes
//=================
var routes = require("./controllers/routes.js");
app.use("/",routes);


app.listen(port, function() {
    console.log("App running on " + port);
  });