
const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    accountNumber:{type:Number,required:true},
    IFSC:{type:String,required:true}
})  

const AccountDetails = new mongoose.model('Account',AccountSchema)
module.exports = AccountDetails