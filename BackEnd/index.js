import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./data.json" assert {type: "json"}
import fs from "fs"
import {grab_data} from "../Stealing/steal.js";
import e from "express";

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.get("/search", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.q) {
        res.status(400).send();
        console.warn("search wrong body");
        return;
    }
    if (!body.limit) body.limit = null;
    let d = await grab_data("results", body.q, body.limit, body.key);
    let gifs = [];
    d.slice(1).forEach(e => {
        gifs.push({id: 123123,url: e[0], tags: e[1][0]}); ///////////////////////////
    });
    res.status(200).send({key: d[0], gifs});
});

app.get("/popular", async (req, res) => {
    var asd = await grab_data("popular");
    console.log(asd);
});

app.get("/tags", async (req, res) => {
    let tags = await grab_data("tags");
    res.status(200).send(tags);
});

app.get("/autofill", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.text) {
        res.status(400).send();
        console.warn("autofill wrong body");
        return;
    }
    let autofill = await grab_data("autofill", body.text);
    res.status(200).send(autofill);
});

app.get("/gif/:id", async (req, res) => {
    let id = req.params.id;
    let gif = await grab_data("data",id);
    res.status(200).send();
});

app.get("/favourites", async (req, res) => {
    res.status(200).send(data.favourites);
});

app.post("/favourites", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.url) {
        res.status(400).send();
        console.warn("favourite/add wrong body");
        return;
    } else {
        if (!body.tags) body.tags = [];
        let index = data.favourites.findIndex(e => e.url == body.url);
        if (index == -1) {
            data.favourites.push({"url": body.url, "tags": body.tags});
            fs.writeFileSync("./data.json", JSON.stringify(data));
            console.log("favourites/add success: " + body.url);
        }
        res.status(204).send();
    }
});

app.delete("/favourites", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.url) {
        res.status(400).send();
        console.warn("favourite/delete wrong body");
        return;
    } else {
        let index = data.favourites.findIndex(e => e.url == body.url);
        if (index != -1) {
            data.favourites.splice(index, 1);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            console.log("favourites/delete url:" + body.url);
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