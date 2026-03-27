const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    profilePicture: String
});

module.exports = mongoose.model("User", userSchema);