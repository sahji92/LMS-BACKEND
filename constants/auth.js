const checkAuth=(req,res,next)=>{
    if(!req.session.isAuthorised){
        return res.status(403).json({
            status: 403,
            message: "user not authorised, plz login first",
          });
    }
    next()
}
module.exports={
    checkAuth
}