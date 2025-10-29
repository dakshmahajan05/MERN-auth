import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './DB/conn.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true
}))

//mongoDB connection

connectDB();

app.get('/',(req,res)=>{
    res.send("helooooo guyjjjj")
})

app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
})

