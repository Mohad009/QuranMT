import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//get students
export const fetchStudents=createAsyncThunk("students/fetchStudents",async(teacherId)=>{
    try{
      const response=await axios.get(`http://localhost:5000/fetchStudent/${teacherId}`)
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
const initialState = {
    students: [],
    countStudents: 0,
    loading: false,
    error: null,
    currentAttendance: null,
    msg:null,
    countStudentsAttendace:0
}
export const studentSlice=createSlice({
    name:"students",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        //fetch students
        .addCase(fetchStudents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchStudents.fulfilled, (state, action) => {
          state.loading = false;
          state.students = action.payload.students;
          state.countStudents = action.payload.countStudents;
        })
        .addCase(fetchStudents.rejected, (state, action) => {
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

    
    }
})

export default studentSlice.reducer