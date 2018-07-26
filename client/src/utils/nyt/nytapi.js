import axios from "axios";
import key from "./key";
console.log(key)

export default {
  // Gets all articles
  getSaved: function() {
    return axios.get("/api/articles");
  },
  // Deletes the article with the given id
  deleteArticle: function(articleData) {
    return axios.delete(`/api/articles/${articleData._id}`);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Saves a note to the database
  saveNote: function(noteData) {
    return axios.post("/api/notes/", noteData);
  },

  getSavedNotes: function() {
    return axios.get("/api/notes");
  },

  getArticles: function(title, startYear, endYear) {

    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + "28c76f86032641b48a5361ea39cb62fa" + "&q=" + title + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231");
  }
};