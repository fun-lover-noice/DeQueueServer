const mongoose = require("mongoose");

const config = require("../config");
const Site = require("../models/site");
const Ticket = require("../models/ticket");
const { createLink } = require("../razerpay");

const ticketPostResolver = async (req, res) => {
  if (!req.body.booking_at) {
    return res
      .status(400)
      .json({ success: false, errors: { booking_at: "Not Provided" } });
  }
  if (!req.body.site) {
    return res
      .status(400)
      .json({ success: false, errors: { site: "Not Provided" } });
  }
  var site = null;
  try {
    site = await Site.findById(req.body.site);
  } catch {
    return res.status(500).json({
      success: false,
      errors: { server: "Internal server error." },
    });
  }
  if (!site) {
    return res
      .status(404)
      .json({ success: false, errors: { site: "Not Found" } });
  }
  const booking_at = new Date(req.body.booking_at);
  const validTime = new Date(req.body.booking_at);
  validTime.setHours(validTime.getHours() + config.validityHour);
  const amount =
    (req.body.adults.length * site.price.adult +
      req.body.children.length * site.price.child) *
    100;
  new_ticket = new Ticket({
    _id: new mongoose.Types.ObjectId(),
    site: req.body.site,
    adults: req.body.adults,
    children: req.body.children,
    amount: amount,
    plink_id: null,
    booking_at: booking_at,
    valid_till: validTime,
    status: null,
  });
  const link = await createLink(amount, new_ticket._id);
  new_ticket.plink_id = link.id;
  new_ticket.status = link.status;
  new_ticket
    .save()
    .then((ticket) => {
      return res.status(200).json({
        success: true,
        id: ticket._id,
        payment_link: link.short_url,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        errors: { server: "Internal server error." },
      });
    });
};

const ticketGetResolver = (req, res) => {
  if (!req.params.ticketID)
    return res.status(400).json({ success: false, error: "ID not provided" });
  Ticket.findById(req.params.ticketID)
    .populate({ path: "site", select: "name" })
    .then((ticket) => {
      if (!ticket) {
        return res
          .status(404)
          .json({ success: false, error: "Ticket not found" });
      }
      const status = ticket.status === "paid" ? "valid" : "invalid";
      return res.status(200).json({
        success: true,
        ticket: {
          _id: ticket._id,
          status,
          adults: ticket.adults.length,
          children: ticket.children.length,
          site: ticket.site,
        },
      });
    })
    .catch(() => {
      return res
        .status(404)
        .json({ success: false, error: "Ticket not found" });
    });
};

module.exports = { ticketPostResolver, ticketGetResolver };
