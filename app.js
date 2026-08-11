import express from "express";
import { createShortUrl, redirectUrl } from "./controllers/url.controller.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/shorten", createShortUrl);

app.get("/:shortCode", redirectUrl);

export default app;