const express = require('express')
const { register, login, create } = require('../controllers/user.js')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/add',create)


module.exports = router