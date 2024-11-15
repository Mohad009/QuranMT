import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import env from 'dotenv'
import userModel from "./Models/userModel.js"
import bcrypt from "bcrypt"
env.config()
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.CONSTRING)

app.listen(5000,()=>{
    console.log("connected to server and database")
})

//register new user
app.post('/register',async(req,res)=>{
    try{
        const hashedPass=await bcrypt.hash(req.body.password,10)

        const user=new userModel({
            name:req.body.name,
            PNumber:req.body.PNumber,
            utype:req.body.utype,
            password:hashedPass
        })

        await user.save()
        res.send({user:user,msg:"Added"})
    }
    catch(e){
        res.status(500).json({e:e})
    }
})



app.post('/login',async(req,res)=>{
    try{
        const {pNumber,password}=req.body
        const user=await userModel.findOne({PNumber:pNumber})
        if(!user){
            return res.json({msg:'User Not found'})
        }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.json({msg:'Login failed'})
        }
        res.json({user,msg:'login successful'})
    }catch(e){
        res.json({e,msg:'something went wrong'})
    }
})