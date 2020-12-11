const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const roomSchema = new Schema ({
    roomID: Number,
    title: String,
    price: Number,
    desc: String,
    location: String,
    photoURL: String
});

const Room = mongoose.model("web322_rooms",roomSchema);
module.exports = Room;