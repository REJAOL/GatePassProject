const Gatepass = require("../models/Gatepass.model.js")

const create = async(req,res)=>{
    const {sender, receiver, dispatchFrom,dispatchTo,preparedBy, items=[],remarks=""} = req.body 

    if(!sender || !receiver || !dispatchFrom || !dispatchTo  || !preparedBy){
        return res.status(400).json({
            sucess:false,
            message:"every filed is needed "
        })
    }


    if(!Array.isArray(items) || items.length===0){
        return res.status(400).json({
            sucess:false,
            message:"atleast one product is mandatory"
        })
    }

    for(let item of items){
        if(!item.name || !item.quantity || !item.unit){
            return res.status(400).json({
                sucess:false,
                message:"each item must have name,quantity and unit"
            })
        }
    }

    const gatePass = await Gatepass.create({
        sender,
        receiver,
        dispatchFrom,
        dispatchTo,
        preparedBy,
        items,
        remarks
        
    })

    return res.status(201).json({
        success:true,
        message:"Gate pass created successfully",
        data:gatePass
    })
}



module.exports = {create}