const express = require('express')
var passport = require('passport')
const { isAuthenticated } = require('../passportConfig')
const multer = require('multer')
const { userLogin, userRegistration, userLogout, getUsers } = require('../controller/authController');
const { createCourse, updateCourse, getCourses, getCourse, getAllCourses } = require('../controller/courseController');
const { createVideo, getVideos } = require('../controller/videoController');
const { createOrder, getOrders } = require('../controller/orderController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + req.user._id.toString() + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage })

const router = express.Router()

router.post('/registerUser',userRegistration)

router.post('/userLogin',passport.authenticate('local'),userLogin)

router.get('/userLogout',userLogout);

router.get('/getUsers',isAuthenticated,getUsers)

router.post('/createCourse', isAuthenticated,createCourse)

router.post('/createVideo', isAuthenticated,createVideo)

router.put('/updateCourse/:course_id', isAuthenticated,updateCourse)

router.get('/getCourses/:teacher_id',isAuthenticated,getCourses)

router.get('/getAllCourses',isAuthenticated,getAllCourses)

router.get('/getVideos/:course_id',isAuthenticated,getVideos)

router.get('/getCourse/:course_id', isAuthenticated,getCourse)

router.post('/createOrder', isAuthenticated, createOrder)

router.get('/getOrders/:user_id', isAuthenticated, getOrders)

router.post('/upload',upload.single('courseImage'), (req,res) => {
    console.log(req.file);
    return res.status(200).json({
        status: 200,
        message: "Image uploaded successfully",
        data: `${process.env.BASE_URL}/files/${req.file.filename}`
    })
})

router.post('/videoUploads',upload.fields([{name: 'thumbnail'},{name: 'pdf'}]), (req,res) => {
    let files = Object.values(req.files);
    console.log(files[0][0].filename);
    return res.status(200).json({
        status: 200,
        message: "Video files uploaded",
        data: {
            thumbnail: `${process.env.BASE_URL}/files/${files[0][0].filename}`,
            pdf: `${process.env.BASE_URL}/files/${files[1][0].filename}`
        }
    })
})
module.exports = router