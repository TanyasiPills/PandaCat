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
    if (!body || !body.id) {
        res.status(400).send();
        console.warn("favourite/add wrong body");
    } else {
        if (!data.favourites.includes(body.id)) {
            data.favourites.push(body.id);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            console.log("favourites/add id:" + body.id);
        }
        res.status(204).send();
    }
});

app.delete("/favourites", jsonParser, async (req, res) => {
    let body = req.body;
    if (!body || !body.id) {
        res.status(400).send();
        console.warn("favourite/delete wrong body");
    } else {
        if (data.favourites.includes(body.id)) {
            data.favourites.splice(data.favourites.indexOf(body.id), 1);
            fs.writeFileSync("./data.json", JSON.stringify(data));
            console.log("favourites/delete id:" + body.id);
        }
        res.status(204).send();
    }
});

app.get("*", async (req, res) => {
    console.log("no page")
    res.status(404).send();
});

app.listen(3000);