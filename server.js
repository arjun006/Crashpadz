var express = require("express");
let router = express.Router();
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
const User = require('./models/user');
const uri = "mongodb+srv://" + process.env.DB_USER +":" + process.env.DB_PASS + "@cluster0.jucej.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
const addUser = require('./controller/addUser');
const userLogin = require('./controller/userLogin');

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
  duration: 2 * 60 * 5000, // duration of the session in milliseconds (5 minutes)
  activeDuration: 2000 * 60 // the session will be extended by this many ms each request (2 minute)
}));
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};

function ensureAdmin(req,res,next){
  console.log(req.session.user)
  if(!req.session.user) {
    res.redirect("/login");
  } else {
    if(req.session.user.isAdmin == true){
      next();
    }
    else{
      res.redirect("/login");
    }
  }
}

//Mongoose Connection
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>  console.log('MongoDB connected...'))
.catch(err => console.log(err));

//User Controller


//GET Routes
app.get("/", function(req,res){
    res.render('index',{
        user: req.session.user,
        layout: false
    });
});
app.get("/rooms", function(req,res){
    res.render('rooms',{
      user: req.session.user,
      layout:false
    });
});
app.get("/register", function(req,res){
    res.render('register',{
        user: req.session.user,
        layout:false
    });
});
app.get("")

app.get("/active", ensureLogin, function(req,res){
  res.render('active',{user:req.session.user, layout:false})
});
app.get("/logout",function(req,res){
  req.session.reset();
  res.render('logout',{layout:false})
});
app.get("/login",function(req,res){
  res.render('login',{layout:false})
});
app.get("/add-room",ensureAdmin,function(req,res){
  res.render('addRoom',{ user:req.session.user,layout:false})
})
//POST Routes
//User Login
app.post('/login-validation',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  if(email === "" || password === ""){
      return res.render('/', {err: "Missing credentials.", layout : false});
  }
      User.findOne({email:req.body.email},function(err,user){
          if(err) throw err;
          if(user){
              user.comparePassword(req.body.password, function(err,isMatch){
                  if(err) throw err;
                  if(isMatch === true){
                      validLogin = true;
                      req.session.user = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAdmin: user.isAdmin
                      }
                      console.log("User: " + user.firstName + " is logged in" + "\n" + "Admin: " + user.isAdmin);
                      res.redirect('/');
                  } else {
                      console.log("Invalid credentials")
                      validLogin = false;
                      res.redirect('/login');
                  }
              });
          } else {
              console.log('User doesn\'t exist');
              validLogin = false;
              res.render("login",{errorMsg:"The email or password entered is not correct", layout:false});
          }  
      })
});

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
app.listen(PORT,function(){
    console.log(`🌎 ==> Server listening now on port ${PORT}!`);
});

