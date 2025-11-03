import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser'
import connectDB from './DB/conn.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5174',
    credentials:true
}))



//mongoDB connection

connectDB();

//api endpoints
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send("helooooo guyjjjj")
})


app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
})

