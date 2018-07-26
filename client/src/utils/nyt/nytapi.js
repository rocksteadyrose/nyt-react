import axios from "axios";
import key from "./key";
console.log(key)

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  // getArticle: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getArticle: function(title, startYear, endYear) {

    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + "28c76f86032641b48a5361ea39cb62fa" + "&q=" + title + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231");
  }
};