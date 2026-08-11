import Url from "../models/urls.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
    try {
        const originalUrl = req.body.url || req.body.originalUrl;

        if (!originalUrl) {
            return res.status(400).json({ message: "URL is required" });
        }

        const shortCode = nanoid(6);

        const newUrl = new Url({
            originalUrl,
            shortCode,
            user: req.user ? req.user.id : null 
        });

        await newUrl.save();

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        res.status(201).json({
            message: "Short URL created successfully",
            shortUrl: `${baseUrl}/${shortCode}`,
            shortCode,
            originalUrl
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};