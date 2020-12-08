const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName:String,
    email:String,
    password:String,
    dob:String,
    isAdmin: Boolean
  });
  userSchema.pre('save',async function(next){
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    } catch(err){
      next(err);
    }
  });

  userSchema.methods.comparePassword = function(pass,cb){
      bcrypt.compare(pass,this.password,function(err,isMatch){
          if(err) {
              throw err;
          }else {
              cb(null,isMatch);
          }
      });
  }
  
const User = mongoose.model("web322_users",userSchema);
module.exports = User;