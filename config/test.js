import dotenv from "dotenv";
dotenv.config();

export default {
  db: {
    uri: process.env.MONGODB_URI,
  },
  port: process.env.PORT || 5000,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  currencyAPI: {
    url: "https://api.currencyapi.com/v3/",
    apiKey: process.env.CURRENCY_API_KEY,
  },
};
