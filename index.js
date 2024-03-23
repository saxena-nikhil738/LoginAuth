// import express from "express";
// import router from "./routes/route.js";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// dotenv.config();
// app.use("/", router);

// const username = process.env.USERNAME;
// const password = process.env.PASSWORD;
// mongoose
//   .connect(
//     `mongodb+srv://${username}:${password}@cluster0.gl3cy6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
//     // { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(console.log("server is running on port 8000"))
//   .catch((error) => {
//     console.log(error);
//   });

// app.listen(8000, () => {
//   console.log("on port 8000");
// });

import express from "express";
import router from "./routes/route.js";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

// MongoDB Atlas connection
const password = process.env.PASSWORD;
const mongoURI = `mongodb+srv://roc-01:${password}@cluster0.gl3cy6g.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running...");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB Atlas:", error);
    process.exit(1); // Exit the process if unable to connect to the database
  });
