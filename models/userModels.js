const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:[true,'name is required'],
 },
 email:{
    type:String,
    required:[true,'email is required'],
 },
 password:{
    type:String,
    required:[true,'password is required'],
 },
 isDoctor:{
   type:Boolean,
   default:false,
 },
 isAdmin:{
   type:Boolean,
   default:false,
 },
 notification:{
   type:Array,
   default:[],
 },
 seennotification:{
   type:Array,
   default:[],
 }
})

module.exports = mongoose.model('user', userSchema)