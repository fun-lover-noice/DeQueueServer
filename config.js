require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  dbUrl: process.env.DB_URL || null,
  tokenKey: process.env.TOKEN_KEY || "test",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  serverUrl: process.env.SERVER_URL || "http://localhost:4000",
  razerPayKeyID: process.env.RAZER_PAY_KEY_ID || "",
  razerPayKeySecret: process.env.RAZER_PAY_KEY_SECRET || "",
  locationiqApiKey: process.env.LOCATIONIQ_API_KEY || "",
  validityHour: parseInt(process.env.VALIDITY_HOUR) || 1,
};

module.exports = config;
