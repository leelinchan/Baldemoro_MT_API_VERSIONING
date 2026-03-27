const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const { username, emailAddress } = req.body;

        const user = new User({
            username,
            email: emailAddress
        });

        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            emailAddress: user.email
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.json({
            id: user._id,
            username: user.username
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;