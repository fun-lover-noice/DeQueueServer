const express = require("express");

const { ticketPostResolver, ticketGetResolver } = require("../resolvers/ticket");

const router = express.Router();

router.post("/", ticketPostResolver);
router.get("/:ticketID", ticketGetResolver);

module.exports = router;