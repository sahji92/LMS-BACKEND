const express=require('express')
const { userRegistration, userLogin, getUsers } = require('../controller/authController')
var passport=require('passport')
const { isAuthenticated } = require('../passportConfig')
const { createCourse } = require('../controller/courseController')


const router=express.Router()
router.post('/registerUser',userRegistration)
router.post('/userLogin',passport.authenticate('local'),userLogin)
router.get('/getUsers',isAuthenticated,getUsers)//call getusers if auth is true
router.post('/createCourse',isAuthenticated,createCourse)
module.exports=router