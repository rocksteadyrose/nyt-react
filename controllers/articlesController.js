const db = require("../models");

// Defining methods for the articlesController
module.exports = {
  findAll: function (req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addNote: function (req, res) {
    db.Note
      .create(req.body)
      .then(dbNote => db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true }))
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.status(422).json(err));
  },
  deleteNote: function (req, res) {
    db.Note
      .remove(req.body)
      .then(dbNote => db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }))
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
