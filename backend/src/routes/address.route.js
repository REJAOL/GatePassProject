const express = require('express')
const { create } = require('../controllers/address.js')
const router = express.Router()


router.post('/add', create)


module.exports = router