const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  articleDate: {
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
  // notes: { 
  //   type: String,
  //   required: true
  //   [
  //     {
  //       note: String,
  //       date: Date.now()
  //     }
  //   ]
  //  }
  note: {
    type: String,
    required: false
  }
})

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
