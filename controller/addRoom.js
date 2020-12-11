const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const multer = require("multer");
const Room = require('../models/room');

function idGen() {
    return Math.floor(
        Math.random() * (1000 - 1) + 1
    )
}
const storage = multer.diskStorage({
    destination: './src/room_images',
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });
router.post('/upload',upload.single('photo'),(req,res) => {
    id = idGen();
    
    var room = new Room({
        roomID: id,
        title: req.body.title,
        price: req.body.price,
        desc: req.body.desc,
        location: req.body.location,
        photoURL: req.file.path
    });
    room.save((err)=>{
        if(err)
        console.log("Error saving room: " + err);
        else{
            console.log("Room added successfully!");
            (res.redirect('/rooms'));
        }
    })
    
});

module.exports =router;
