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
            type:mongoose.Schema.Types.ObjectId,
            ref:'Sender',
            required:true,
    },
    receiver:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Receiver',
            required:true
    },
    dispatchFrom:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            required:true 
    },
    dispatchTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address',
            required:true 
    },
    preparedBy:{
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
                default:""
            },
            employee_id:{
                type:String,
                default:""
            },
            department:{
                type:String,
                default:""
            }
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