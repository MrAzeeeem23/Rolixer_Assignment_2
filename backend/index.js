import express from "express";
import sequelize from "./database/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'


import UserRoute from "./routes/user.routes.js";
import StoreRoute from "./routes/store.routes.js";
import RatingRoute from "./routes/rating.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "*"
  }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("Database synced successfully");

    app.use("/api/v1/user", UserRoute);
    app.use("/api/v1/store", StoreRoute);
    app.use("/api/v1/rating", RatingRoute); 

    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to connect with DB:", error.message);
    console.error(error.stack);
  }
})();
