const express = require('express')
const { create, getAllAddress, update, remove, renderAddress,renderAddAddress, renderaddedaddress } = require('../controllers/address.js')
const router = express.Router()


router.post('/add', create)
router.get('/getalladdress',getAllAddress)
router.patch('/update',update)
router.delete('/delete', remove)




router.get('/',renderAddress)
router.get('/addaddress',renderAddAddress)
router.post('/create',renderaddedaddress)


module.exports = router