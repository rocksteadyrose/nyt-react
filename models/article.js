const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  startYear: {
    type: String,
    required: true
  },
  endYear: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: { 
    type: Date, 
    default: Date.now
  },

  saved: {
    type: Boolean,
    default: false
  },

  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
 }]
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
