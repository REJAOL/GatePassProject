const Address = require("../models/Address.model.js");
const GatePass = require("../models/GatePass.model.js");
const Receiver = require("../models/Receiver.model.js");
const Sender = require("../models/Sender.model.js");
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const htmlToPdf = require('html-to-pdf');
const puppeteer = require('puppeteer')



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
      .populate('sender receiver dispatchFrom dispatchTo')
      .lean();

    if (!gatepass) return res.status(404).send('Gate pass not found');

    const html = await ejs.renderFile(
      path.join(__dirname, '..', 'views', 'gatePass', 'pdf.ejs'),
      { gatepass }
    );

    // Launch Puppeteer with Render-compatible args
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--single-process'
      ],
      executablePath: process.env.CHROME_PATH || '/usr/bin/chromium-browser'
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=gatepass_${gatepass._id}.pdf`
    });
    res.send(pdfBuffer);

  } catch (err) {
    console.error('PDF Error:', err);
    res.status(500).send('PDF generation failed: ' + err.message);
  }
};


module.exports = {create, getAllGatePass, createGatePass, renderGatePassCreate, renderGatePassDetails, downloadPdf}