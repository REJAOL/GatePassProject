const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
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
        required:true 
    },
    employee_id:{
        type:Number,
        required:true 
    },
    department:{
        type:String,
        required:true 
    },
    // password:{
    //     type:String,
    // }
})


module.exports = mongoose.model('User',userSchema)