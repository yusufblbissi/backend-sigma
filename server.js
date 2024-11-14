import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import loanRoutes from "./routes/index.js";
import connectDB from "./config/db.js";
import config from "./config/config.js";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();


const swaggerOptions = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "Loan Application API", 
      version: "1.0.0", 
      description: "API for managing loan applications", 
    },
  },
  apis: ["./routes/*.js"], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use(loanRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
