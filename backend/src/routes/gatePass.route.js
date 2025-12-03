const express = require('express')
const { create } = require('../controllers/gatePass.js')
const router = express.Router()


router.post('/create',create)


module.exports=router