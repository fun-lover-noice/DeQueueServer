const Site = require("../models/site");

const siteGetResolver = async (req, res) => {
  if (!req.params.siteID)
    return res.status(400).json({ success: false, error: "ID not provided" });
  Site.findById(req.params.siteID)
    .then((site) => {
      if (!site) {
        return res
          .status(404)
          .json({ success: false, error: "Site not found" });
      }
      return res.status(200).json({ success: true, site });
    })
    .catch(() => {
      return res.status(404).json({ success: false, error: "Site not found" });
    });
};

const allSitesGetResolver = (req, res) => {
  if (req.query.city) {
    var sites = Site.find({ city: req.query.city });
  } else {
    var sites = Site.find();
  }

  sites
    .then((sites) => {
      return res.status(200).json({ success: true, sites });
    })
    .catch(() => {
      return res
        .status(400)
        .json({ success: false, error: "Something Went Wrong." });
    });
};

module.exports = { siteGetResolver, allSitesGetResolver };
