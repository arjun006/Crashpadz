var express = require("express");
const { dirname } = require("path");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/img"));


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});
app.get("/rooms", function(req,res){
    res.sendFile(path.join(__dirname,"/views/rooms.html"));
});


app.listen(PORT,function(){
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});