const express = require("express");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let router = express.Router();
let assert = require("assert");
let User = require('../models/user');
const { urlencoded } = require("body-parser");
var existingUser = true;
    router.post('/add-user',(req, res,) => {
        console.log("Add user");
        var user = new User({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            dob:req.body.dob
          });
          User.findOne({email: req.body.email},function(err,doc){
              if(err){
                  console.log("Error finding user: " + err);
                  return res.status(400);
              } else {
                  if(doc){
                    console.log("email already in use.");
                    existingUser = true;
                  }else {    
                    console.log("save user");
                    user.save((err) => {
                        if(err) {
                            console.log("There was an error saving the user." + err);
                         } else {
                             console.log("User successfully saved!");
                         }
                 });
                    existingUser=false;
                    
                }
          }
       console.log(req.body);

        }).then(function(){
            if(existingUser){
                res.redirect('/');
                //alert('Email already in use.')
            } else {
                res.redirect('/register');
            }
        });
          
      });
module.exports = router;
        // save the company





