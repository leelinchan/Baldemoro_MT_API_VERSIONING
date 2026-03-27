const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const { username, email } = req.body;

        const user = new User({
            username,
            email
        });

        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture || null
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { email },
            { new: true }
        );

        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;