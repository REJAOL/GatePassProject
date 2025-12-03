const Address = require("../models/Address.model")

const create = async(req,res)=>{
    const {location,details} = req.body 

    try {
        const destination = await Address.create({
            location,
            details  
        })
    
        await destination.save()
         console.log(destination)
        return res.status(201).json({
            destination
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}



module.exports={create}