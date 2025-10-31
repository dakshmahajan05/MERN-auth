import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData } from "../controllers/user.controllers.js";

const router = Router()

router.get('/data',userAuth,getUserData)

export default router