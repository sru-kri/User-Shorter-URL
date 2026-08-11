import { Router } from "express";
import { createShortUrl, getMyUrls } from "../controllers/url.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/shorten", verifyToken, createShortUrl);
router.get("/my-urls", verifyToken, getMyUrls);

export default router;