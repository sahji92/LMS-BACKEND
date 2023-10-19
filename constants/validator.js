const emailValidator=(email)=>{
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    console.log(email)
    console.log(emailRegex.test(email))
   return emailRegex.test(email)
}
module.exports={emailValidator}