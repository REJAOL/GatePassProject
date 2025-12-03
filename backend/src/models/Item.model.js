const  mongoose  = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    quantity:{
        type:String,
        
    },
    unit:{
        type:String,
    },
    Comment:{
        type:String
    },
    Remarks:{
        type:String,
        
    }
})


module.exports = mongoose.model('Item',itemSchema)