import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import data from "./data.json" assert {type: "json"}
import fs from "fs"

const app = express();
const jsonParser = bodyParser.json();

app.use(cors());

app.get("/search", jsonParser, async (req, res) => {
    //return search result list
    let body = req.body;
    console.log(body);
    res.status(200).send(body);
});

app.get("/tags", async (req, res) => {
    //return list of tags
});

app.get("/gif/:id", async (req, res) => {
    //get specific gif
    let id = req.params.id;
    console.log("id: " + id);
    res.status(200).send(id);
});

app.get("/favourites", async (req, res) => {
    res.status(200).send(data.favourites);
});

app.post("/favourites", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.url || !body.tags) {
        res.status(400).send();
        console.warn("favourite/add wrong body");
    } else {
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

app.listen(3000, () => {
    if (!data.favourites) data.favourites = [];
    console.clear();
    console.log("\nserver started on 3000");
});