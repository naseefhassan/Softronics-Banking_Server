
const mongoose = require("mongoose")

const AccountSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    accountNumber:{type:Number,required:true},
    IFSC:{type:String,required:true},
    amount:{type:Number, required:true}
})  

const deposit = new mongoose.model('Deposit',AccountSchema)
module.exports = deposit