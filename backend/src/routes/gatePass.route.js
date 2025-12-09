const express = require('express')
const { create, createGatePass, getAllGatePass,renderGatePassCreate,renderGatePassDetails, downloadPdf } = require('../controllers/gatePass.js')
const router = express.Router()


router.post('/create',create)



router.get('/',getAllGatePass)
router.post('/add', createGatePass )
router.get('/create',renderGatePassCreate)
router.get('/:id', renderGatePassDetails);
router.get("/:id/pdf", downloadPdf);



module.exports=router