import User from "../models/user.models.js"
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try {
        const {email,name,password} = req.body
        if(!name || !email || !password){
            return res.status(300).json({ message: "all fields required", success: false });
        }

        const existingUser =await User.findOne({email})
        if(existingUser){
            console.log("user already exist");
            return res.status(400).json({message:"user already exist"})
        }

        const hashPass =bcrypt.hashSync(password,10)
        const user = new User({email,name,password:hashPass})
        await user.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7D'})

         //passed as a cookie......

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({message:"user registered successfully",success:true,user,token})

    } catch (error) {
        console.log("err while registering: ",error);
        return res.status(400).json({success:false,message:error.message})
        
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(300).json({message:"all fields required",success:false,})
        }

        const user = await User.findOne({email});
        if(!user){
            console.log("user not exist");
            return res.status(400).json({message:"user not found",success:false})
        }

        const ismatched = await bcrypt.compare(password,user.password)

        if(!ismatched){
            return res.status(400).json({message:"invalif credentials",success:false})
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7D'})
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json({success:true,message:"user login successfull"})

    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict'
        })
        return res.json({message:"logout successfull",success:true})

    } catch (error) {
        return res.status(400).json({message:error.message})
        
    }
}