
const User = require("../models/User.model.js")

const create = async(req,res)=>{
    const {name,phone,designation,employee_id,department} = req.body 

    try {
        const userInfo = await User.create({
            name,
            phone,
            designation,
            employee_id,
            department
        })
    
        await userInfo.save()
        
        return res.status(201).json({
            data:userInfo
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}

const get = async(req,res)=>{
    const users = await User.find({})

    return res.status(200).json({
        message:"users are these",
        data:users
    })
}

const register = (req,res)=>{

}

const login = (req,res)=>{

}


module.exports = {register,login, create,get}