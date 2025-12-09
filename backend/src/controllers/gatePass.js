const Address = require("../models/Address.model");
const GatePass = require("../models/GatePass.model");
const Receiver = require("../models/Receiver.model");
const Sender = require("../models/Sender.model");
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const htmlToPdf = require('html-pdf-node')



const create = async (req, res) => {
    const { sender, receiver, dispatchFrom, dispatchTo, preparedBy, items = [], remarks = "" } = req.body;

        if(!sender || !receiver || !dispatchFrom || !dispatchTo  || !preparedBy || !items){
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

    const gatePass = await GatePass.create({
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

};
const getAllGatePass = async (req, res) => {
    
    const gatepasses = await GatePass.find({})
            .populate('sender')        
            .populate('receiver')   
            .populate('dispatchFrom')  
            .populate('dispatchTo')
            .populate('preparedBy')
            .sort({ createdAt: -1 })
            .lean() 

            
    res.render('gatePass/index',{gatepasses:gatepasses})
};


const createGatePass = async (req, res) => {
  try {
    const {
      sender,
      receiver,
      dispatchFrom,
      dispatchTo,
      preparedBy,
      items = [],
      remarks = ""
    } = req.body;

    // ✅ Basic validation
    if (!sender || !receiver || !dispatchFrom || !dispatchTo || !preparedBy || !items) {
      return res.status(400).json({
        success: false,
        message: "Every field is required"
      });
    }

    // ✅ Items validation
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product is mandatory"
      });
    }

    for (let item of items) {
      if (!item.name || !item.quantity || !item.unit) {
        return res.status(400).json({
          success: false,
          message: "Each item must have name, quantity and unit"
        });
      }
    }

    // ✅ ✅ ✅ NAME → OBJECT ID RESOLVE (MAIN FIX)

    const senderDoc = await Sender.findOne({ name: sender });
    if (!senderDoc) {
      return res.status(400).json({
        success: false,
        message: "Sender not found"
      });
    }

    const receiverDoc = await Receiver.findOne({ name: receiver });
    if (!receiverDoc) {
      return res.status(400).json({
        success: false,
        message: "Receiver not found"
      });
    }

    const dispatchFromDoc = await Address.findOne({ hubName: dispatchFrom });
    if (!dispatchFromDoc) {
      return res.status(400).json({
        success: false,
        message: "Dispatch From address not found"
      });
    }

    const dispatchToDoc = await Address.findOne({ hubName: dispatchTo });
    if (!dispatchToDoc) {
      return res.status(400).json({
        success: false,
        message: "Dispatch To address not found"
      });
    }

    // ✅ ✅ ✅ FINAL CREATE
    await GatePass.create({
      sender: senderDoc._id,
      receiver: receiverDoc._id,
      dispatchFrom: dispatchFromDoc._id,
      dispatchTo: dispatchToDoc._id,
      preparedBy,
      items,
      remarks
    });

    // ✅ SUCCESS REDIRECT
    return res.redirect('/api/v1/gatepass/');

  } catch (error) {
    console.error("CREATE GATE PASS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};





const renderGatePassCreate = async(req,res)=>{

    const senders = await Sender.find({})
    const addresses = await Address.find({})
    const receivers = await Receiver.find({})

    return res.render('gatePass/create',{
        senders:senders,
        addresses:addresses,
        receivers:receivers
    })
}

const renderGatePassDetails = async (req, res) => {
  try {
    const gatepass = await GatePass.findById(req.params.id)
      .populate('sender')
      .populate('receiver')
      .populate('dispatchFrom')
      .populate('dispatchTo');

    if (!gatepass) {
      return res.status(404).send('Gate Pass not found');
    }

    res.render('gatePass/details', {
      gatepass
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const downloadPdf = async (req, res) => {
  try {
    const gatepass = await GatePass.findById(req.params.id)
      .populate("sender receiver dispatchFrom dispatchTo");

    if (!gatepass) return res.status(404).send("Gatepass not found");

    // Convert logo to Base64
    const logoPath = path.join(__dirname, "..","..", "public", "images", "daraz-logo.png");
    const logoBase64 = fs.readFileSync(logoPath, "base64");

    // Render EJS with Base64
    const filePath = path.join(__dirname, "..", "views/gatepass/pdf.ejs");
    const html = await ejs.renderFile(filePath, { gatepass, logoBase64 });

    const file = { content: html };
    const options = {
      format: "A4",
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    };

    const pdfBuffer = await htmlToPdf.generatePdf(file, options);

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename="gatepass_${gatepass._id}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('pdf generation failed', err)
    res.status(500).send(err.message);
  }
};

module.exports = {create, getAllGatePass, createGatePass, renderGatePassCreate, renderGatePassDetails, downloadPdf}