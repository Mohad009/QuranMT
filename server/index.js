import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import env from 'dotenv'
import userModel from "./Models/userModel.js"
import studentModel from "./Models/studentModel.js"
import attendanceModel from "./Models/attendanceModel.js"
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
app.post('/registerUser',async(req,res)=>{
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
        res.status(500).json({e})
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

//logout
app.post("/logout",async(req,res)=>{
    res.status(200).json({msg:"Logged out successfully"})
})


//add new student
app.post('/addStudent',async(req,res)=>{
    try{
        const{fname,lname,teacherId,parentNum}=req.body
        const student=new studentModel({
            firstName:fname,
            lastName:lname,
            teacherId:teacherId,
            parentNumber:parentNum
        })
        await student.save()
        res.send({msg:"Added",student:student})

    }catch(e){
        res.status(500).json({e})
    }
})

//fetch student
//get post api
app.get('/fetchStudent/:teacherId',async(req,res)=>{
    try{
        const {teacherId}=req.params
        const objectId = new mongoose.Types.ObjectId(teacherId);
        const students=await studentModel.find({teacherId:objectId})
        const countStudents=await studentModel.countDocuments({teacherId:objectId})
        res.send({students:students,count:countStudents})
    }catch(e){
        console.error(e)
        res.status(500).json({error:"An error occurred"})
    }
})


//record attendance
app.post('/recordAttendance', async (req, res) => {
    try {
      const { teacherId, date, records } = req.body;
  
      // Validate input
      if (!teacherId || !date || !records || !Array.isArray(records)) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Check if attendance already exists for this date and teacher
      const existingRecord = await attendanceModel.findOne({ teacherId, date: new Date(date) });
  
      if (existingRecord) {
        // Update existing record
        existingRecord.records = records;  // Overwrite or merge if needed
        await existingRecord.save();
        return res.status(200).json({ message: 'Attendance updated successfully', existingRecord });
      }
  
      // Create a new attendance document
      const newRecord = new attendanceModel({
        teacherId,
        date: new Date(date),
        records,
      });
  
      await newRecord.save();
      res.status(201).json({ message: 'Attendance recorded successfully', newRecord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to record attendance' });
    }
  });
  

  //fetch attendace records
  app.get('/fetchAttendance/:teacherId', async (req, res) => {
    try {
      const { teacherId } = req.params;
      const objectId = new mongoose.Types.ObjectId(teacherId);
      const attendanceRecords = await attendanceModel.countDocuments({teacherId: objectId,"records.status": "Present" })
        // .populate('records.studentId', 'firstName lastName parentNumber') // Get student details
  
      res.status(200).json(attendanceRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch attendance records' });
    }
  });