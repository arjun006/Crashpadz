var express = require("express");
var path = require("path");
var multer = require("multer");
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const exhbs = require('express-handlebars');


var app = express();
var PORT = process.env.PORT || 3000;
app.engine('.hbs', exhbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', '.hbs');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/img"));


app.get("/", function(req,res){
    res.render('index',{
        layout: false
    });
});
app.get("/rooms", function(req,res){
    res.render('rooms',{
        layout:false
    });
});

app.post("/register", urlencodedParser, [
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail()
], (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('register', {
            alert
        })
    }
});
app.listen(PORT,function(){
    console.log(`🌎 ==> Server listening now on port ${PORT}!`);
});
