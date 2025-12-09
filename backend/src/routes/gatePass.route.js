const express = require('express')
const { create, createGatePass, getAllGatePass,renderGatePassCreate,renderGatePassDetails, downloadPdf } = require('../controllers/gatePass.js')
const router = express.Router()


router.post('/create',create)



router.get('/',getAllGatePass)
router.post('/add', createGatePass )
router.get('/create',renderGatePassCreate)
router.get('/:id', renderGatePassDetails);
router.get("/:id/pdf", downloadPdf);

router.get('/:id', async (req, res) => {
  try {
    const gatepass = await GatePass.findById(req.params.id)
      .populate('sender receiver dispatchFrom dispatchTo')
      .lean();

    if (!gatepass) {
      return res.status(404).send('Gate pass not found');
    }

    res.render('gatePass/daraz-pdf', { gatepass });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

module.exports=router