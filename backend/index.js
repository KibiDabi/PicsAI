import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js';

// Pull out env variables from .env file
dotenv.config();

// Init express.js
const app = express();
const port = 8080;

// Add aditional middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Created API endpoints for connecting with FE
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Creating first route
app.get("/", async (req, res) => {
  res.send("Hello from DALLE");
});

// The way to run this app
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(port, () => {
      console.log("Server has started on port http://localhost:8080");
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
