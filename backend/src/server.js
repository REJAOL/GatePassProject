require('dotenv').config()
const mongoose = require('mongoose')

const app = require('../src/app.js')


mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("mongodb connected"))
    .catch(err=>console.log(err))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`app is running on port: ${PORT}`);
})

