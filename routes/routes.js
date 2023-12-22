const express=require('express')
const { userRegistration, userLogin, getUsers, userLogout } = require('../controller/authController')
var passport=require('passport')
const { isAuthenticated } = require('../passportConfig')
const { createCourse, getCourses, updateCourse, getCourse,} = require('../controller/courseController')
const { createVideo } = require('../controller/videoController')


const router=express.Router()
router.post('/registerUser',userRegistration)
router.post('/userLogin',passport.authenticate('local'),userLogin)
router.get('/userLogout',userLogout)
router.get('/getUsers',isAuthenticated,getUsers)//call getusers if auth is true
router.post('/createCourse',createCourse)
router.post('/createVideo',createVideo)
//{{solve it lator }} router.get('/getCourses/:teacher_id',isAuthenticated,getCourses)
router.get('/getCourses/:teacher_id',getCourses)
router.get('/getCourse/:course_id',getCourse)//to edit particuler course
router.put('/updateCourse/:course_id',updateCourse)

module.exports=router