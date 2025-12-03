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
    // Designation:{
    //     type:String,
    //     required:true
    // },
    // Employee_id:{
    //     type:Number,
    //     required:true 
    // },
    // Department:{
    //     type:String,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     require:true
    // }
})


module.exports = mongoose.model('User',userSchema)