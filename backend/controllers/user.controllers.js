import User from "../models/user.models.js";

export const getUserData = async(req,res)=>{
    try {
        //const {userId} = req.body
        const user = await User.findById(req.user.id)

        if(!user){
            return res.json({message:"user not found",success:false})
        }

        res.json({success:true,userdata:{
            "username":user.name,
            isAccountVerified:user.isAccountVerified
        }})
    } catch (error) {
        return res.json({message:error.message,success:false})
    }
}