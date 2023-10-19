const express=require('express')
const mongoConnection=require('./connection')
const cors=require('cors')
const router = require('./routes/routes')

require('dotenv').config()
const app=express()
mongoConnection(process.env.URI)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    console.log("Hello")
    res.send("Hello world")
})
app.use(router)

app.listen(process.env.PORT)