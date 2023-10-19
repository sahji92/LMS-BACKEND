const express=require('express')
const { userRegistration, userLogin, getUsers } = require('../controller/authController')
const { checkAuth } = require('../constants/auth')
const router=express.Router()
router.post('/registerUser',userRegistration)
router.post('/userLogin',userLogin)
router.get('/getUsers',checkAuth,getUsers)//call getusers if checkauth is true
module.exports=router