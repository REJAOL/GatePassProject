
const Reciever = require("../models/Reciever.model.js")

const create = async(req,res)=>{
    const {name,phone} = req.body 

    try {
        const receiverInfo = await Reciever.create({
            name,
            phone  
        })
    
        await receiverInfo.save()
        
        return res.status(201).json({
            receiverInfo
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}



module.exports={create}