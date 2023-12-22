const Videos=require('../models/videos')

const createVideo=(req,res)=>{
    // if(req.user.type!=='teacher'){
    //     return res.json({
    //         status:403,
    //         message:"you are not authorised to create a course"
    //     })
    // }
    // req.body.teacher_id=req.user.id
    const video=new Videos(req.body);
    video.save()
    .then(result=>{
        return res.json({
            status:201,
            message:"Video added successfully"
        })
    })
    .catch(err=>{
        return res.json({
            status:500,
            message:"Bad request"
        })
    })
}

const getCourses=(req,res)=>{
    const teacher_id=req.params.teacher_id
    Courses.find({teacher_id})
    .then(result=>{
        return res.status(200).json({
            status:200,
            message:"Courses fetched successfully",
            data:result
        })
    })
    .catch(err=>{
        return res.status(400).json({
            status:400,
            message:"Bad request"
        })
    })
}
const updateCourse=(req,res)=>{
    const course_id=req.params.course_id
    if(req.user.type!=='teacher'){
        return res.json({
            status:403,
            message:"you are not authorised to create a course"
        })
    }
Courses.findOneAndUpdate({_id:course_id},req.body)
    .then(result=>{
        return res.status(200).json({
            status:200,
            message:"Course updated successfully"
        })
    })
    .catch(err=>{
        return res.status(500).json({
            status:500,
            message:"Bad request"
        })
    })
    
}

module.exports={
    createVideo
}