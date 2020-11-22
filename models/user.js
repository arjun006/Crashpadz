const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: String,
    lastName:String,
    email:String,
    password:String,
    dob:String
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
const User = mongoose.model("web322_users",userSchema);
module.exports = User;