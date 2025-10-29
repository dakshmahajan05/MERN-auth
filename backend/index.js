import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send("helo")
})

app.listen(port,()=>{
    console.log(`listening on port: ${port}`);
})

