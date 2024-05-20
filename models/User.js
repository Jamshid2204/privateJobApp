const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{type:String, required: true, unique: true},  
  email:{type:String, required: true, unique: true},  
  password:{type:String, required: true},  
  uid:{type:String, required: true, unique: true},  
  location:{type:String, required: false},
  phone:{type:String, required: false},
  resume:{type:String, default: '', required: false},
  updated:{type:Boolean, default: false},
  isAdmin:{type:Boolean, default: false},
  isAgent:{type:Boolean, default: false},
  skills:{type:Boolean, default: true, required:false},
  profile:{type:String,required:true, default:"https://cdn-icons-png.flaticon.com/128/1077/1077012.png"},
  
},{timestamps : true});

module.exports = mongoose.model('User', UserSchema);