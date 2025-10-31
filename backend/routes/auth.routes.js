
import { Router } from "express";
import { isAuthenticated, login, logout, register, resetPass, sendResetOtp, sendVerificationOTP, verifyEmail } from "../controllers/auth.controllers.js";
import userAuth from "../middleware/userAuth.js";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)

router.post('/send-verification-otp',userAuth,sendVerificationOTP)
router.post('/verify-email',userAuth,verifyEmail)
router.post('/is-auth',userAuth,isAuthenticated)

router.post('/send-pass-reset-otp',sendResetOtp)
router.post('/reset-pass',resetPass)

export default router;