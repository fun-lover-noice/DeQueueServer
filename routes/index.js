const express = require("express");

const { homeResolver, razerPayCallbackResolver, getCitiesResolver, getCityByLocationResolver } = require("../resolvers/");
const { authentication_middleware } = require("../middlewares");

const router = express.Router();

router.get("/", authentication_middleware, homeResolver);
router.get("/cities" , getCitiesResolver)
router.get("/city" , getCityByLocationResolver)
router.get("/callback", razerPayCallbackResolver);

module.exports = router;
