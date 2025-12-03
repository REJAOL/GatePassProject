const  mongoose  = require("mongoose");

const addressSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true 
    },
    details:{
        type:String,
        required:true 
    },

})


module.exports = mongoose.model('Address',addressSchema)