const express = require("express");

const { siteGetResolver, allSitesGetResolver } = require("../resolvers/site");

const router = express.Router();

router.get("/:siteID", siteGetResolver);
router.get("/", allSitesGetResolver);

module.exports = router;
