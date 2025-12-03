const express = require('express')
const { register, login, create, get } = require('../controllers/user.js')

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/add',create)
router.get('/all',get)


module.exports = router