const  mongoose  = require("mongoose");

const senderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    phone:{
        type:String,
        required:true 
    },
    designation:{
        type:String,
        required:true,
    },
    employee_id:{
        type:Number,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
})


module.exports = mongoose.model('Sender',senderSchema)