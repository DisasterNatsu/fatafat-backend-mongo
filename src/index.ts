import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./routes/postRoutes";
import getRoutes from "./routes/getRoutes";
import authRoutes from "./routes/authRoutes";

// initialize express app

const app: Express = express();

// initiate enviornment variable

dotenv.config();

// body parser

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// express json

app.use(express.json());

// use cors (currently it's global)

// define origins

const origins: string[] = [
  "https://kolkataff.space",
  "https://admin.kolkataff.space",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (!origin || origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));

// routes

app.use("/post", postRoutes);

app.use("/get", getRoutes);

app.use("/auth", authRoutes);

try {
  // connect to mongodb

  mongoose
    .connect("mongodb://adminFatafat:Disaster%401997@localhost:27017/fatafat")
    .then(() => console.log("Connected to database"));

  // listen

  app.listen(process.env.PORT || 8050, () =>
    console.log(`Listning on port ${process.env.PORT || 8050}`)
  );
} catch (error) {
  console.log(error);
}
