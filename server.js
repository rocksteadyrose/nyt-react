const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);


mongoose.Promise = global.Promise;
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mongo_scraper",
  {
    useMongoClient: true
  }
)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
