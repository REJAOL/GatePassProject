const express = require('express')
const { create } = require('../controllers/receiver.js')
const router = express.Router()


router.post('/add', create)


module.exports = router