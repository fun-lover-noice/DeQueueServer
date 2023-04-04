const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

const ticketSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    site : { type: Schema.Types.ObjectId, ref: "sites"},
    adults: [
      {
        _id: Schema.Types.ObjectId,
        first_name: String,
        last_name: String,
        age: Number,
      },
    ],
    children: [
      {
        _id: Schema.Types.ObjectId,
        first_name: String,
        last_name: String,
        age: Number,
      },
    ],
    amount: Number,
    plink_id: String,
    status: String,
    booking_at: Date,
    valid_till: Date,
  },
  schemaOptions
);

const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = Ticket;
