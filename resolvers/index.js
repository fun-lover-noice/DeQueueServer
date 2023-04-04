const axios = require("axios");

const config = require("../config");
const Site = require("../models/site");
const Ticket = require("../models/ticket");

const homeResolver = (req, res) => {
  return res.status(200).json({ success: true, msg: "Yo!", user: req.user });
};

const getCitiesResolver = (req, res) => {
  Site.find()
    .distinct("city")
    .then((cities) => {
      return res.status(200).json({ success: true, cities });
    })
    .catch(() => {
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong" });
    });
};

const getCityByLocationResolver = (req, res) => {
  axios
    .get(
      `https://us1.locationiq.com/v1/reverse.php?key=${config.locationiqApiKey}&lat=${req.query.lat}&lon=${req.query.long}&format=json`
    )
    .then((r) => {
      return res.status(200).json({
        success: true,
        city: r.data.address.state_district.toLowerCase().replaceAll(" ", "-"),
      });
    })
    .catch((e) => {
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    });
};

const razerPayCallbackResolver = (req, res) => {
  const id = req.query.razorpay_payment_link_reference_id;
  const status = req.query.razorpay_payment_link_status;
  Ticket.findByIdAndUpdate(id, { $set: { status } })
    .then(() => {
      return res.redirect(`${config.clientUrl}/ticket/${id}`);
    })
    .catch(() => {
      return res.status(500).json({ error: "Something went wrong" });
    });
};

module.exports = {
  homeResolver,
  getCitiesResolver,
  getCityByLocationResolver,
  razerPayCallbackResolver,
};
