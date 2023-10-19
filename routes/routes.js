const express=require('express')
const { userRegistration, userLogin } = require('../controller/authController')
const router=express.Router()
router.post('/registerUser',userRegistration)
router.post('/userLogin',userLogin)
module.exports=router