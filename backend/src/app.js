const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

const userRouter = require('./routes/user.route.js')
const gatePassRouter = require('./routes/gatePass.route.js')
const addressRouter = require('./routes/address.route.js')
const receiverRouter = require('./routes/reciever.route.js')
const senderRouter = require('./routes/sender.route.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/gatepass', gatePassRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/gatepass', gatePassRouter)
app.use('/api/v1/addresses', addressRouter)
app.use('/api/v1/receivers', receiverRouter)
app.use('/api/v1/senders', senderRouter)
app.use('/gatepass', require('./routes/gatePass.route'));

module.exports = app