import { Router } from "express";

import { Link, Topic } from "./models";
import { getChannelInfo } from "./utils/telegram";
import { isUri } from "valid-url";
import url from "url";
import { title } from "process";

const router = Router();

const sendHome = async (req, res) => {

  var recents = await Link.find().sort({ createdAt: -1 }).limit(5);

  var topics = await Topic.aggregate([
    {
      $lookup: {
        from: "links",
        let: { indicator_id: "$_id" },
        as: "links",
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$topic", "$$indicator_id"],
              },
            },
          },
          { $sort: { clicks: -1 } },
          { $limit: 14 },
        ],
      },
    },
  ]);
  res.render("index", { recents, topics });
};

router.get("/", sendHome);
router.post(
  "/",
  async (req, res, next) => {
    console.log(req.body);
    var adress = req.body.link;

    if (!isUri(adress)) {
      req.flash("error", "invalid link");
      return next();
    }

    var uri = url.parse(adress);

    if (uri.hostname !== "t.me") {
      req.flash("error", "not a telegram link");
      return next();
    }

    var topic = req.body.topic;

    topic = await Topic.findOne({ title: topic });

    var info = await getChannelInfo(adress);

    if (info.type !== "GROUP") {
      info.username = uri.pathname;
    }

    var link = new Link({ ...info, adress, topic: topic._id });
    link.save();
    next();
  },
  sendHome
);

router.get("/visit/:id", async (req, res) => {
  var id = req.params.id;
  var link = await Link.findById(id);

  link.clicks++;

  link = Object.assign(link, await getChannelInfo(link.adress));
  await link.save();

  res.redirect(link.adress);
});

const getLastPage = (total) => {
  if (total % 20 > 0) {
    return total / 20 + 1;
  } else total / 20;
};

router.get("/topic/:topic", async (req, res) => {
  var topic = req.params.topic;
  topic = await Topic.findOne({ title: topic });
  if (topic == undefined) return res.render("404");

  var page = req.query.page || 1;

  var total = await Link.countDocuments({ topic: topic._id });

  var lastPage = getLastPage(total);

  var links = await Link.find({ topic: topic._id })
    .sort({ clicks: -1 })
    .skip((page - 1) * 20)
    .limit(20);

  res.render("topicPage", { topic, links, pagination: { page, lastPage ,path: req.path + "?" } });
});

router.get("/search", async (req, res) => {
  var criteria = req.query.criteria;
  // var topic = req.query.topic;

  var page = req.query.page || 1;

  var query = {
    $or: [
      { title: { $regex: criteria } },
      { username: { $regex: criteria } },
      { description: { $regex: criteria } },
    ],
  };

  // if (topic && topic !== 'all') {
  //   topic = await Topic.findOne({ title: topic });
  //   query.topic = topic._id
  // }

  var total = await Link.countDocuments(query);

  var lastPage = getLastPage(total);

  var links = await Link.find(query)
    .skip((page - 1) * 20)
    .limit(20);

  res.render("searchPage", {  links, pagination: { page, lastPage , path: req.path + "?criteria=" + criteria + "&" } });
});

export default router;