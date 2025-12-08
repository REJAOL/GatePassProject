
const Sender = require("../models/Sender.model.js")

const create = async(req,res)=>{
    const {name,phone,designation,employee_id,department } = req.body 

    try {
        const senderInfo = await Sender.create({
            name,
            phone,
            designation,
            employee_id,
            department
        })
    
        await senderInfo.save()
        
        return res.status(201).json({
            senderInfo
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}



module.exports={create}