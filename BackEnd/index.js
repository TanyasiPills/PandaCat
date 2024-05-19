import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./data.json" assert {type: "json"}
import fs from "fs"
import {grab_data} from "../Stealing/steal.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

function isFavourite(id) {
    return data.favourites.some(e => e.id == id);
}

const dir = dirname(fileURLToPath(import.meta.url));

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.get("/search", jsonParser, async (req, res) => {
  let query = req.query;
  if (!query || !query.q) {
    res.status(400).send();
    console.warn("search wrong query");
    return;
  }
  let d;
  try {
    d = await grab_data("results", query.q, query.limit, query.key);
  } catch (e) {
    res.status(400).send();
    return;
  }
  let gifs = [];
  d.slice(1).forEach((e) => {
    gifs.push({ url: e[0], id: e[1], favourite: isFavourite(e[1]) });
  });
  res.status(200).send({ key: d[0], gifs });
});

app.get("/popular", jsonParser, async (req, res) => {
    let query = req.query;
    let raw;
    try {
        if (!query) raw = await grab_data("popular");
        else raw = await grab_data("popular", null, query.limit, query.key);
    } catch (e) {
        res.status(400).send();
        return;
    }
    let popular = {key: raw[0], gifs: []}
    raw.slice(1).forEach(e => popular.gifs.push({url: e[0], id: e[1], favourite: isFavourite(e[1])}));
    res.status(200).send(popular);
});

app.get("/tags", async (req, res) => {
  let tags = await grab_data("tags");
  res.status(200).send(tags);
});

app.get("/autofill", jsonParser, async (req, res) => {
  let query = req.query;
  if (!query || !query.text) {
    res.status(400).send();
    console.warn("autofill wrong query");
    return;
  }
  let autofill = await grab_data("autofill", query.text);
  res.status(200).send(autofill);
});

app.get("/gif/:id", async (req, res) => {
  let id = req.params.id;
  let raw = await grab_data("data", id);
  let gif = {
    url: raw[0][0],
    tags: raw[0][1],
    discription: raw[0][2],
    favourite: isFavourite(id),
  };
  res.status(200).send(gif);
});

app.get("/favourites", async (req, res) => {
  res.status(200).send(data.favourites);
});

app.post("/favourites", jsonParser, async (req, res) => {
  let body = req.body;
  if (!body || !body.url || !body.id) {
    res.status(400).send();
    console.warn("favourite/add wrong body");
    return;
  } else {
    let index = data.favourites.findIndex((e) => e.id == body.id);
    if (index == -1) {
      data.favourites.push({ url: body.url, id: body.id });
      fs.writeFileSync(dir + "/data.json", JSON.stringify(data));
      console.log("favourites/add success: " + body.id);
    }
    res.status(204).send();
  }
});

app.delete("/favourites", jsonParser, async (req, res) => {
  let body = req.body;
  if (!body || !body.id) {
    res.status(400).send();
    console.warn("favourite/delete wrong body");
    return;
  } else {
    let index = data.favourites.findIndex((e) => e.id == body.id);
    if (index != -1) {
      data.favourites.splice(index, 1);
      fs.writeFileSync(dir + "/data.json", JSON.stringify(data));
      console.log("favourites/delete id:" + body.id);
    }
    res.status(204).send();
  }
});

app.get("*", async (req, res) => {
  console.log("not found: " + req.url);
  res.status(404).send();
});

var listener = app.listen(3000, () => {
  if (!data.favourites) data.favourites = [];
  console.clear();
  console.log("\nserver started on " + listener.address().port);
});
