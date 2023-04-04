const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const siteSchema = new Schema(
  {
    name: String,
    description: String,
    image: String,
    city: String,
    price: {
      adult: Number,
      child: Number,
    },
  },
  schemaOptions
);

const Site = mongoose.model("sites", siteSchema);

module.exports = Site;
