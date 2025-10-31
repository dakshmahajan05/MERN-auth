import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const userAuth = async(req,res,next)=>{
   try {
     const {token} = req.cookies
 
     if(!token){
         return res.json({message:"not authorised, login again",success:false})
     }

     const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

     if(decodedToken.id){
        req.body.userId=decodedToken.id;
     }else{
        return res.json({success:false,message:"not authorised"})
     }

     next();
     
   } catch (error) {
        res.json({success:false,message:error.message})
   }
}


export default userAuth;