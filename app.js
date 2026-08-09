import express from "express";
import { Router } from "express";

const app=express();
app.use(express.json());

const router = Router();

router.get("/hello", (req, res) => {
    res.json({ message: "Hello" });
});
app.use(router);

export default app;

