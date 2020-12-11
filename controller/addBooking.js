const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const multer = require("multer");
const Booking = require('../models/booking');

router.post('/booking',(req,res) => {
    
    var booking = new Booking({
        roomID: req.body.roomID,
        checkin:req.body.checkin,
        checkout:req.checkout
    });
    console.log(booking);
    booking.save((err)=>{
        if(err)
        console.log("Error saving booking: " + err);
        else{
            console.log("Booking added successfully!");
            (res.render('index',{user:req.session.user,layout:false}));
        }
    })
    
});

module.exports = router;