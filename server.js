const express=require('express')
const mongoConnection=require('./connection')
const cors=require('cors')
const router = require('./routes/routes')
var session=require('express-session')
require('dotenv').config()
var passport=require('passport')
const {initializePassport}=require('./passportConfig')

const app=express()
mongoConnection(process.env.URI)
app.use(cors())
app.use(express.json())
initializePassport(passport)
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie:{secure:false},
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/files', express.static('uploads'))

app.get('/',(req,res)=>{
    console.log("Hello")
    res.send("Hello world")
})
app.use(router)

app.listen(process.env.PORT)