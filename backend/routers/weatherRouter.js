import express from "express";
import expressAsyncHandler from "express-async-handler";
import fetch from "node-fetch";
import geoip from "geoip-lite";

const weatherRouter = express.Router();

weatherRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const city = req.query.city;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    let country = "";
    if (req.query.country.length > 0) {
      country = req.query.country;
    } else if (geo) {
      country = geo.country;
    }

    const url_base = process.env.OPEN_WEATHER_URL;
    const api_key = process.env.OPEN_WEATHER_API;

    const fetch_url =
      country.length > 0
        ? `${url_base}/weather?q=${city},${country}&units=metric&appid=${api_key}`
        : `${url_base}/weather?q=${city}&units=metric&appid=${api_key}`;

    const response = await fetch(fetch_url);
    if (response.ok) {
      const data = await response.json();
      res.send({
        data,
        message: "Successfully retrieved data from the server",
      });
    } else {
      res.status(404).send({ message: "No data retrieved from the server" });
    }
  })
);

export default weatherRouter;
