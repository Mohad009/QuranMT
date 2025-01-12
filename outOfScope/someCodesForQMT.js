// //get students
export const fetchStudentsByTeacher=createAsyncThunk("students/fetchStudentsByTeacher",async(teacherId)=>{
    try{
      const response=await axios.get(`http://localhost:5000/fetchStudentsByTeacher/${teacherId}`)
      return {students:response.data.students,countStudents:response.data.count}
        
    }catch(e){
      console.log(e)
    }
  })

//record the attendace
export const recordAttendance = createAsyncThunk(
    'students/recordAttendance',
    async (attendanceData) => {
      try {
        const response = await axios.post('http://localhost:5000/recordAttendance', attendanceData);
        const record=response.data.newRecord
        const msg=response.data.message
        return {record,msg};
      } catch (error) {
        throw error.response.data.error || 'Failed to record attendance';
      }
    }
  );
// get the attendace for today
export const fetchAttendance = createAsyncThunk(
    'attendance/fetchAttendance',
    async (teacherId) => {
      try {
        const response = await axios.get(`http://localhost:5000/fetchAttendance/${teacherId}`);
        return response.data;
      } catch (error) {
        throw error.response.data.error || 'Failed to fetch attendance';
      }
    }
  );


  
  builder

  //fetch students
  .addCase(fetchStudentsByTeacher.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchStudentsByTeacher.fulfilled, (state, action) => {
    state.loading = false;
    state.students = action.payload.students;
    state.countStudents = action.payload.countStudents;
  })
  .addCase(fetchStudentsByTeacher.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder
  //save the attendace
.addCase(recordAttendance.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.message = null;
})
.addCase(recordAttendance.fulfilled, (state, action) => {
  state.loading = false;
  state.msg = action.payload.msg;
  state.currentAttendance = action.payload.record || action.payload.existingRecord;
})
.addCase(recordAttendance.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
});

builder
//fetch the attendace
.addCase(fetchAttendance.pending, (state) => {
state.loading = true;
})
.addCase(fetchAttendance.fulfilled, (state, action) => {
state.loading = false;
state.countStudentsAttendace = action.payload;
})
.addCase(fetchAttendance.rejected, (state, action) => {
state.loading = false;
state.error = action.error.message;
});


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