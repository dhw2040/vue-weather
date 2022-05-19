import express from "express";
import expressAsyncHandler from "express-async-handler";
import path from "path";
import fs from "fs";

import fetch from "node-fetch";
import * as cheerio from "cheerio";

import News from "../models/newsModel.js";
import Comment from "../models/commentModel.js";

const newsRouter = express.Router();

newsRouter.get("/", function (req, res) {
  res.redirect("/stories");
});

newsRouter.get(
  "/feed",
  expressAsyncHandler(async (req, res) => {
    const response = await fetch(
      "https://www.theweathernetwork.com/ca/news/category/latest"
    );
    const body = await response.text();
    if (body) {
      fs.writeFile(process.cwd() + "/weather.html", body, (err) => {
        if (err) {
          console.error(err);
        }
        console.log("File written Successfully");
      });
      const $ = cheerio.load(body);

      let count = 0;

      $(".story-thumb").each(function (idx, e) {
        let story = {};
        const anchor = $(this).children("a");
        const img = anchor.find("img");

        story.title = anchor.children("p").text();
        story.link = anchor.attr("href");
        story.image = img.attr("src");
        story.category = anchor.children("span").text();

        if (story.title !== "" && story.link !== "") {
          News.find({ title: story.title }, function (err, doc) {
            if (err) {
              res
                .status(404)
                .send({ message: "Failed while searching for existing story" });
            } else if (doc.length > 0) {
              console.log(`Same story exists with title ${story.title}`);
            } else {
              const news = new News(story);
              news.save(function (err, doc) {
                if (err) {
                  console.error.bind(
                    console,
                    `Failed to create news number with title ${story.title}`
                  );
                } else {
                  console.log(
                    `Successfully saved the story with title ${story.title}`
                  );
                  count = count + 1;
                }
              });
            }
          });
        } else {
          console.log("Empty title and array, nothing to do here");
        }
      });
      res.send(`Total ${count} stories have been populated`);
    } else {
      res.status(404).send({ message: "Page Not Found" });
    }
  })
);

newsRouter.get(
  "/removeAll",
  expressAsyncHandler(async (req, res) => {
    const remove = await News.remove({});
    if (remove) {
      res.send({ message: "Successfully removed all stories" });
    } else {
      res.status(404).send({ message: "Failed to remove all stories" });
    }
  })
);

newsRouter.get(
  "/stories",
  expressAsyncHandler(async (req, res) => {
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setHours(23, 59, 59, 999);

    const stories = await News.find({
      created_on: { $gte: start, $lt: end },
    }).sort({ _id: -1 });
    if (stories) {
      res.send(stories);
    } else {
      res.status(404).send({ message: "Failed to retrieve stories" });
    }
  })
);

newsRouter.get(
  "/all-stories",
  expressAsyncHandler(async (req, res) => {
    const stories = await News.find().sort({ _id: -1 });
    if (stories) {
      res.send(stories);
    } else {
      res.status(404).send({ message: "Failed to retrieve stories" });
    }
  })
);

// newsRouter.get(
//     "/search",
//     expressAsyncHandler(async (req, res) => {
//        const stories = await News.find().sort({_id: -1});
//        if(stories){
//            res.send(stories);
//        } else {
//           res.status(404).send({message: "Failed to retrieve stories"});

//        }
//     })
//   );

export default newsRouter;
