const  mongoose  = require("mongoose");

const addressSchema = new mongoose.Schema({
    hubName:{
        type:String,
        required:true 
    },
    details:{
        type:String,
        required:true 
    },
    contactPerson:{
        type:String,
        required:true 
    },
    phoneNumber:{
        type:String,
        required:true
    }

},{
    timestamps:true
})


module.exports = mongoose.model('Address',addressSchema)