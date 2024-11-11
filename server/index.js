import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import env from 'dotenv'
env.config()
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.CONSTRING)
app.listen(5000,()=>{
    console.log("connected to server and database")
})