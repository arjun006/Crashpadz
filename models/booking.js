const express = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bookingSchema = new Schema ({
    roomID: Number,
    checkin: String,
    checkout: String
});

const Booking = mongoose.model("web322_bookings",bookingSchema);
module.exports = Booking;