const express = require('express')
const app = express()

const userRouter = require('./routes/user.route.js')
const gatePassRouter = require('./routes/gatePass.route.js')
const addressRouter = require('./routes/address.route.js')
const receiverRouter = require('./routes/reciever.route.js')

app.use(express.json())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/gates', gatePassRouter)
app.use('/api/v1/addresses', addressRouter)
app.use('/api/v1/receivers', receiverRouter)

module.exports = app