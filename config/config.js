import dotenv from "dotenv";
import productionConfig from "./production.js";
import testConfig from "./test.js";

dotenv.config();

const config =
  process.env.NODE_ENV === "production" ? productionConfig : testConfig;

export default config;
