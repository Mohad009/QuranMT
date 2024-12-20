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
            isActive:req.body.isActive,
            password:hashedPass
        })

        await user.save()
        res.send({user:user,msg:"Added"})
    }
    catch(e){
        res.status(500).json({e})
    }
})
//update user
app.put('/updateUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, pNumber, utype, isActive, password } = req.body;
    const objectId = new mongoose.Types.ObjectId(userId);
    const hashedPass = await bcrypt.hash(password, 10);
    const updateData = {
      name,
      PNumber: pNumber,
      utype,
      isActive,
      password:hashedPass
    };
    const user = await userModel.findByIdAndUpdate(
      objectId,
      updateData,
      { new: true }
    );

    res.json({ user, msg: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/login', async (req, res) => {
  try {
      const { pNumber, password } = req.body;
      const user = await userModel.findOne({ PNumber: pNumber });
      if (!user) {
          return res.status(404).json({ msg: 'User Not Found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return res.status(401).json({ msg: 'Login failed' });
      }
      res.status(200).json({ user, msg: 'Login successful' });
  } catch (e) {
      res.status(500).json({ error: e.message, msg: 'Something went wrong' });
  }
});

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
app.get('/fetchStudentsByTeacher/:teacherId',async(req,res)=>{
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




  //update student and add new hifz
  app.put('/updateHifz/:studentId', async (req, res) => {
    try {
      const { studentId } = req.params;
      const { chapter, ayahRange, mark, notes } = req.body;
      const objectId = new mongoose.Types.ObjectId(studentId)
  
      // Find student and update by pushing new hifz record
      const updatedStudent = await studentModel.findByIdAndUpdate(
        objectId,
        {
          $push: {
            hifz: {
              chapter,
              ayahRange,
              mark,
              notes,
              date: new Date()
            }
          }
        },
        { new: true } 
      )
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.status(200).json({
        message: 'Hifz progress updated successfully',
        student: updatedStudent
      });
  
    } catch (error) {
      console.error('Error updating hifz:', error);
      res.status(500).json({ error: 'Failed to update hifz progress' });
    }
  });

  // Fetch all users
  app.get('/users', async (req, res) => {
    try {
      const users = await userModel.find({}, '-password'); // Exclude password field
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  // Delete user
  app.delete('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      await userModel.findByIdAndDelete(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  // Get all students
  app.get('/students', async (req, res) => {
    try {
      const students = await studentModel.find()
        .populate('teacherId', 'name') // Populate teacher data, selecting only the name field
        .exec();
      res.status(200).json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  // Delete student
  app.delete('/students/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await studentModel.findByIdAndDelete(id);
      res.status(200).json({ msg: 'Student deleted successfully', id });
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ error: 'Failed to delete student' });
    }
  });

  // Update student
  app.put('/students/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, teacherId, parentNumber } = req.body;
      
      const updatedStudent = await studentModel.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          teacherId,
          parentNumber
        },
        { new: true }
      );
      
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.status(200).json({ msg: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Failed to update student' });
    }
  });

  // Update user profile information
  app.put('/updateProfile/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { name, PNumber } = req.body;
      const objectId = new mongoose.Types.ObjectId(userId);

      const updatedUser = await userModel.findByIdAndUpdate(
        objectId,
        {
          name,
          PNumber:parseInt(PNumber)
        },
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json({ user: updatedUser, msg: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update user password
  app.put('/updatePassword/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const { newPassword } = req.body;
      const objectId = new mongoose.Types.ObjectId(userId);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await userModel.findByIdAndUpdate(
        objectId,
        { password: hashedPassword },
        { new: true }
      ).select('-password');

      if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json({ user: updatedUser, msg: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


