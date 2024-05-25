const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true, default:'User'},

})

const UserDetails = new mongoose.model('UserData',UserSchema)

module.exports = UserDetails