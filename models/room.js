const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const roomSchema = new Schema ({
    title: String,
    price: Number,
    desc: String,
    location: String,
    photo: String
});

const Room = mongoose.model("web322_users",roomSchema);
module.exports = Room;