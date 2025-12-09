const Address = require("../models/Address.model.js")


const getAllAddress = async(req,res)=>{
    const destinations = await Address.find({})

    return res.status(200).json({
        message:'all destinations',
        data:destinations
    })
}
const create = async(req,res)=>{
    const {hubName,details,contactPerson,phoneNumber} = req.body 

    try {
        const destination = await Address.create({
            hubName,
            details,
            contactPerson,
            phoneNumber
        })
    
        await destination.save()
        
        return res.status(201).json({
            destination
        })
    
    } catch (error) {
        console.log('something wromg', error);
    }
   

}

const update= async(req,res)=>{

}
const remove = async(req,res)=>{

}


const renderAddress = async(req,res)=>{
    const addresses = await Address.find({})
    res.render('address/index', {addresses})
}

const renderAddAddress= async(req,res)=>{
    res.render('address/create')
}

const renderaddedaddress = async(req,res)=>{
    const {hubName,details,contactPerson,phoneNumber} = req.body
  await Address.create({
        hubName,
        details,
        contactPerson,
        phoneNumber
    })

    res.redirect('/api/v1/addresses')
}


module.exports={create,getAllAddress, update,remove,renderAddress,renderAddAddress,renderaddedaddress}