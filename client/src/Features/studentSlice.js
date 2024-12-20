import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//get students
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


//update students collection and add new hifz
export const updateHifz = createAsyncThunk(
  "students/updateHifz",
  async ({ studentId, hifzData }) => {
    console.log('In thunk - hifzData:', hifzData);
    try {
      const response = await axios.put(
        `http://localhost:5000/updateHifz/${studentId}`,
        hifzData
      );
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to update hifz';
    }
  }
);

// Fetch all students
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to fetch students';
    }
  }
);

// Add new student
export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData) => {
    try {
      const response = await axios.post('http://localhost:5000/addStudent', {
        fname: studentData.firstName,
        lname: studentData.lastName,
        teacherId: studentData.teacherId,
        parentNum: studentData.parentNumber
      });
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to add student';
    }
  }
);


// Update student
export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }) => {
    try {
      const response = await axios.put(`http://localhost:5000/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to update student';
    }
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to delete student';
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

    //add hifz record
    builder
    .addCase(updateHifz.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateHifz.fulfilled, (state, action) => {
      state.loading = false;
      // Update the specific student in the state
      const index = state.students.findIndex(
        student => student._id === action.payload.student._id
      );
      if (index !== -1) {
        state.students[index] = action.payload.student;
      }
    })
    .addCase(updateHifz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch students
    builder
    .addCase(fetchStudents.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
    })
    .addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

    // Add student
    .addCase(addStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isSuccess = false;
    })
    .addCase(addStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.msg = action.payload.msg;
      if (action.payload.student) {
        state.students.push(action.payload.student);
      }
    })
    .addCase(addStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isSuccess = false;
    })

    // Update student
    .addCase(updateStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isSuccess = false;
    })
    .addCase(updateStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.msg = action.payload.msg;
      const index = state.students.findIndex(
        student => student._id === action.payload.student._id
      );
      if (index !== -1) {
        state.students[index] = action.payload.student;
      }
    })
    .addCase(updateStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isSuccess = false;
    })

    // Delete student
    .addCase(deleteStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload.msg;
      state.students = state.students.filter(
        student => student._id !== action.payload.id
      );
    })
    .addCase(deleteStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    }
})

export default studentSlice.reducer