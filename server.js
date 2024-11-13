import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import loanRoutes from "./routes/index.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use(loanRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
