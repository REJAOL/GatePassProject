const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const GatePass = require('../models/GatePass.model');

exports.downloadGatepassPdf = async (req, res) => {
  try {
    const gatepass = await GatePass.findById(req.params.id)
      .populate('sender receiver preparedBy dispatchFrom dispatchTo')
      .lean();

    if (!gatepass) return res.status(404).send('Gatepass not found');

    const filePath = path.join(__dirname, '..', 'views', 'pdf.ejs');

    // Render EJS to HTML
    const html = await ejs.renderFile(filePath, { gatepass });

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    await browser.close();

    // Send PDF as response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Gatepass_${gatepass._id}.pdf"`,
      'Content-Length': pdfBuffer.length
    });
    res.send(pdfBuffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
