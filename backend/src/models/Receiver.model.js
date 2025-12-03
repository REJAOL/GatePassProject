const  mongoose  = require("mongoose");

const recieverSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    phone:{
        type:String,
        required:true 
    },
    Designation:{
        type:String,
    },
    Employee_id:{
        type:Number,
    },
    Department:{
        type:String,
    },
})


module.exports = mongoose.model('Reciever',recieverSchema)