const  mongoose = require("mongoose");


const gatePassSchema = new mongoose.Schema({

    sender:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    },
    receiver:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Reciever',
            required:true
    },
    dispatchFrom:{
        address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            required:true 
        }

    },
    dispatchTo:{
        address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            required:true 
        }
    },
    preparedBy:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    }

}, {
    timestamps:true
})

module.exports = mongoose.model('GatePass', gatePassSchema)