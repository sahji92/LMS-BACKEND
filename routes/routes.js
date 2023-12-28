const express=require('express')
const { userRegistration, userLogin, getUsers, userLogout } = require('../controller/authController')
var passport=require('passport')
const { isAuthenticated } = require('../passportConfig')
const { createCourse, getCourses, updateCourse, getCourse,} = require('../controller/courseController')
const { createVideo } = require('../controller/videoController')
const multer = require('multer')

//diskstorage allows us to store files in disc
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()+'-'+ file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage })

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

//for file handling using multer
router.post('/upload',upload.single('courseImage'), (req,res) => {
    console.log(req.file);
    return res.status(200).json({
        status: 200,
        message: "Image uploaded successfully",
        data: `${process.env.BASE_URL}/files/${req.file.filename}`
    })
})

module.exports=router