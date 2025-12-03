const Gatepass = require("../models/Gatepass.model.js")

const create = async(req,res)=>{
    const {sender, receiver, dispatchFrom,dispatchTo,items,preparedBy} = req.body 
    if(!sender || !receiver || !dispatchFrom || !dispatchTo  || !preparedBy){
        return res.status(500).json({
            sucess:false,
            message:"every filed is needed "
        })
    }

    const gatePass = await Gatepass.create({
        sender,
        receiver,
        dispatchFrom,
        dispatchTo,
        preparedBy,
        
    })

    return res.status(201).json({
        gatePass
    })
}



module.exports = {create}