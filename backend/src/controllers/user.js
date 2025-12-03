
const User = require("../models/User.model.js")

const create = async(req,res)=>{
    const {name,phone} = req.body 

    try {
        const userInfo = await User.create({
            name,
            phone  
        })
    
        await userInfo.save()
        
        return res.status(201).json({
            userInfo
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}

const register = (req,res)=>{

}

const login = (req,res)=>{

}


module.exports = {register,login, create}