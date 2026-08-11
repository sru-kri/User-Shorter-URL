import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await foundUser.comparePassword(password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: foundUser._id, username: foundUser.username },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};