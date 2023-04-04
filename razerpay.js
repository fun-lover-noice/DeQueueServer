const Razorpay = require("razorpay");

const config = require("./config");

var instance = new Razorpay({
  key_id: config.razerPayKeyID,
  key_secret: config.razerPayKeySecret,
});

const createLink = async (amount, ticketID) => {
  return instance.paymentLink.create({
    amount,
    currency: "INR",
    description: "For Tickets",
    reference_id: ticketID,
    customer: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
    },
    notify: {
      email: true,
    },
    callback_url: `${config.serverUrl}/callback`,
    callback_method: "get",
  });
};

module.exports = { createLink };
