const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({

  userId:{type: String ,requrired:true},
  skill:{type: String ,requrired:true},
},{timestamps : true}); 

module.exports = mongoose.model('Skill', skillSchema);
