import express, { Router } from "express";
import serverless from "serverless-http";
import cors from 'cors';
import 'dotenv/config';

import search from "./api/search.js";
import getBrands from "./api/getBrands.js";
import getSeller from "./api/getSeller.js";

const api = express();
api.use(cors());

const router = Router();

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });

router.get("/", (req, res) => {
    res.json({"hello": "world"});
});

router.get("/getSeller", (req, res) => {
    let sellerId = req.query.sellerId;
    getSeller(sellerId)
    .then((username) => {
        res.json({"sellerUser": username});
    })
    .catch((e) => {
        console.log("Error: " + e);
    });
});

router.get("/getBrands", (req, res) => {
    getBrands()
    .then(data => {
        res.json(data);
    })
    .catch((e) => {
        console.log("Error: " + e);
    });
});

router.get("/search", async (req, res) => {
    search(req)
    .then(data => {
        res.json(data);
    });
});

router.get("/test", (req, res) => {
    res.send("Hello, world!");
});

api.use("/api/", router);

export const handler = serverless(api);
