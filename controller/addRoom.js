const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const Room = require('../models/room');

router.post('add-room',(req,res) => {
    var room = new Room({
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        location: req.body.location,
        photo: req.body.photo
    })
})
