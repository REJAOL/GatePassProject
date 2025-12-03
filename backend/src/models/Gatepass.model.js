const  mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true,
            trim:true 
        },
        quantity:{
            type:String,
            required:true,
        },
        unit:{
            type:String,
            required:true
        },
        comments:{
            type:String,
            trim:true
        }
})





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
            ref:'Receiver',
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
    items:[itemSchema],
    remarks:{
        type:String,
        default:""
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