const Courses=require('../models/courses')

const createCourse=(req,res)=>{
    if(req.user.type!=='teacher'){
        return res.json({
            status:403,
            message:"you are not authorised to create a course"
        })
    }
    req.body.teacher_id=req.user.id
    const course=new Courses(req.body);
    course.save()
    .then(result=>{
        return res.json({
            status:201,
            message:"Course created successfully"
        })
    })
    .catch(err=>{
        return res.json({
            status:400,
            message:"Bad request"
        })
    })
}
module.exports={
    createCourse
}