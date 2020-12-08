// const express = require("express");
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extended: false});
// const clientSessions = require('client-sessions');
// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// let router = express.Router();
// let User = require('../models/user');
// let validLogin = true;
// app.use(clientSessions({
//     cookieName: "session", // this is the object name that will be added to 'req'
//     secret: "web322_assign3_unguessably_long_string_", // this should be a long un-guessable string.
//     duration: 2 * 60 * 1000, // duration of the session in milliseconds (2 minutes)
//     activeDuration: 1000 * 60 // the session will be extended by this many ms each request (1 minute)
//   }));
// router.post('/login',(req,res)=>{
    
//     const email = req.body.email;
//     const password = req.body.password;
//     if(email === "" || password === ""){
//         return res.render('/', {err: "Missing credentials.", layout : false});

//     }
//         User.findOne({email:req.body.email},function(err,user){
            
//             if(err) throw err;
//             console.log(user);
//             if(user){
//                 user.comparePassword(req.body.password, function(err,isMatch){
//                     if(err) throw err;
//                     if(isMatch === true){
//                         validLogin = true;
//                         console.log("valid password1" + validLogin);
//                         res.redirect('/active');
//                     } else {
//                         console.log("invalid password")
//                         validLogin = false;
//                         res.redirect('/');
//                         alert("invalid password");
//                         console.log("invalid1" + validLogin)
//                     }
//                 });
//             } else {
//                 console.log('user doesn\'t exist');
//                 validLogin = false;
//             }
            
//         })
//         //.then(function(){
//         //     if(validLogin === true){
//         //         //create active session here
//         //         console.log("valid password2" + validLogin);
//         //     } else {
//         //         res.redirect('/');
//         //         console.log("invalid2" + validLogin)
//         //     }
            
//         // });
//         console.log(req.session.user);
// });

// module.exports = router;