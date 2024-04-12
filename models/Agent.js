const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({

  userId:{type: String ,requrired:true},
  uid:{type: String ,requrired:true},
  company:{type: String ,requrired:true},
  hq_address:{type: String ,requrired:true},
  working_hrs:{type: String ,requrired:true},
  

},{timestamps : true});


module.exports = mongoose.model('Agent', AgentSchema);
