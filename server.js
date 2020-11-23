var express = require("express");
var path = require("path");
var multer = require("multer");
const dotenv = require('dotenv')
dotenv.config();
const clientSessions = require('client-sessions');
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const exhbs = require('express-handlebars');
const mongoose = require("mongoose");
const db = require('../web322_assign_1/models/user');
const uri = "mongodb+srv://" + process.env.DB_USER +":" + process.env.DB_PASS + "@cluster0.jucej.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
const addUser = require('../web322_assign_1/controller/addUser');
const userLogin = require('../web322_assign_1/controller/userLogin');

//Express Connection
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
app.use(clientSessions({
  cookieName: "session", // this is the object name that will be added to 'req'
  secret: "web322_assign3_unguessably_long_string_", // this should be a long un-guessable string.
  duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
  activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
}));


//Mongoose Connection
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>  console.log('MongoDB connected...'))
.catch(err => console.log(err));

//User Controller


//GET Routes
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
app.get("/register", function(req,res){
    res.render('register',{
        layout:false
    });
});
app.get("/active",function(req,res){
  res.render('active',{layout:false})
});
app.get("/logout",function(req,res){
  res.render('logout',{layout:false})
});
//POST Routes


//Registration mailing
const storage = multer.diskStorage({
    destination: "",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERV,
    auth: { 
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
  });

  app.post("/register",upload.single(''),(req, res) => {

    const FORM_FILE = req.file;
    const FORM_DATA = req.body;



  var mailOptions = {

    from: process.env.USER_EMAIL,
    to: FORM_DATA.email,
    subject: 'Test email from NODE.js using nodemailer',
    html: '<p>Hello ' + FORM_DATA.First + ":</p><p>Thank-you for contacting us.</p>"

}

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      console.log("ERROR: " + error);
  } else {
      console.log("SUCCESS: " + info.response);
  }
});


app.get('/register', function(req, res){

  var someData = {
   fname: FORM_DATA.First

  }
  res.render('register', {
  data: someData, layout: false});
});


res.writeHead(302, {
  'Location': '/register'
});
res.end();
});
app.use('/', addUser);
app.use('/', userLogin)
app.listen(PORT,function(){
    console.log(`🌎 ==> Server listening now on port ${PORT}!`);
});

