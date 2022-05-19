import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import bodyParser from "body-parser";
import newsRouter from "./routers/newsRouter.js";

const port = process.env.port || 5000; // env var

const app = express();
// app.use(logger("dev"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const MONGO_URI = process.env.MONGODB_URL || "mongodb://localhost/weather";
mongoose.connect(MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to Mongoose:"));
db.once("open", function () {
  console.log("Connected to Mongoose!");
});

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/news", newsRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
