const router = require("express").Router();
const articlesRoutes = require("./articles");

// Articles routes
router.use("/articles", articlesRoutes);

module.exports = router;
