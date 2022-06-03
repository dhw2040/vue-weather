import express from "express";
import expressAsyncHandler from "express-async-handler";
import fetch from "node-fetch";
import geoip from "geoip-lite";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cities = require("../city.list.min.json");

const weatherRouter = express.Router();

weatherRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const city = req.query.city.toLowerCase();
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    let country = "";
    let matchedCities = [];
    let fetch_urls = [];
    let data = [];
    let errors = [];
    let count = 3;

    if (req.query.country.length > 0) {
      // Check if country is available
      country = req.query.country;
    } else if (geo) {
      // if not, get the geocode data
      country = geo.country;
    } else {
      // if geocode is not available, resort to local DB
      for (let c of cities) {
        if (c.name.toLowerCase() === city) {
          matchedCities.push(c);
          console.log(c.name);
        }
      }

      // matchedCities = cities.filter((c) => {
      //   c.name.toLowerCase() === city;
      // });
      // console.log(matchedCities);
    }

    if (country.length > 0) {
      fetch_urls.push(
        `${process.env.OPEN_WEATHER_URL}/weather?q=${city},${country}&units=metric&appid=${process.env.OPEN_WEATHER_API}`
      );
    } else if (matchedCities.length >= 1) {
      for (let place of matchedCities) {
        fetch_urls.push(
          `${process.env.OPEN_WEATHER_URL}/weather?id=${place.id}&units=metric&appid=${process.env.OPEN_WEATHER_API}`
        );
      }
    } else {
      fetch_urls.push(
        `${process.env.OPEN_WEATHER_URL}/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API}`
      );
    }

    for (let url of fetch_urls) {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        data.push(json);
      } else {
        errors.push(response.statusText);
      }
    }

    if (data.length > 0) {
      console.log(data);
      res.send({
        data,
        success: true,
        message: "Successfully retrieved data from the server",
      });
    } else {
      res.status(404).send({
        errors,
        success: false,
        message: "No data retrieved from the server",
      });
    }

    // const response = await fetch(fetch_url);
    // if (response.ok) {
    //   const data = await response.json();
    //   res.send({
    //     data,
    //     message: "Successfully retrieved data from the server",
    //   });
    // } else {
    //   res.status(404).send({ message: "No data retrieved from the server" });
    // }
  })
);

export default weatherRouter;
