import User from "../models/user.models.js"
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/nodemailer.js"

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
        //sending welcome email

       const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Welcome to DakshDev `,
            text: `Hello ${name}, your account has been successfully created!`,
        }

        await transporter.sendMail(mailoptions)


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

//send verification otp to user's email
// backend se frontend ko res me cookie milegi 
//cookie me token hai aur usme user._id
//we need a middleware function for this

export const verificationOTP = async(req,res)=>{
    try {
        const {userId} = req.body;
        const user = await User.findById(userId);
        if(user.isAccountVerified){
            return res.status(200).json({message:"user already verified",success:true})
        }

        const OTP = String(Math.floor(   100000 + Math.random()*900000))
        user.verifyOtp=OTP;
        user.verifyOtpExpireAt=Date.now() + 24*60*60*1000

        await user.save();

        const mailoptions={
            from :process.env.SENDER_EMAIL,
            to:user.email,
            subject:"Acoount verification OTP",
            text:`verify your account using this otp: ${OTP}`
        }
        await transporter.sendMail(mailoptions);
        res.json({message:"verification OTP sent successfully",success:true})
     
    } catch (error) {
        console.log("failed to verify otp");
        
        res.status(400).json({message:error.message,success:false})
    }
}

//verify email address with entering otp
export const verifyEmail = async(req,res)=>{
   try {
     const {userId,OTP} = req.body;
 
     if(!userId || !OTP){
         return res.json({message:"missing details",success:false})
     }
     const user =await User.findById(userId)
     if(!user){
        return res.json({message:"user not found",success:false})
     }

     if(user.verifyOtp == '' || user.verifyOtp!=OTP){
        return res.json({message:"invalid OTP",success:false})
     }
     if(user.verifyOtpExpireAt<Date.now()){
        res.json({message:"otp expired",success:false})
     }

     user.isAccountVerified=true;
     user.verifyOtp='',
     user.verifyOtpExpireAt=0;

     await user.save();
     return res.json({message:"email verified",success:true})

   } catch (error) {
        return res.json({message:"failed to verify email",success:false})

   }
}

