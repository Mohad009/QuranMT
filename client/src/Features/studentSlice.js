import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//update students collection and add new hifz
export const updateHifz = createAsyncThunk(
  "students/updateHifz",
  async ({ studentId, hifzData }) => {
    console.log('In thunk - hifzData:', hifzData);
    try {
      const response = await axios.put(
        `https://quranmt-server.onrender.com/updateHifz/${studentId}`,
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
      const response = await axios.get('https://quranmt-server.onrender.com/students');
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
      const response = await axios.post('https://quranmt-server.onrender.com/addStudent', {
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
      const response = await axios.put(`https://quranmt-server.onrender.com/students/${id}`, studentData);
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
      const response = await axios.delete(`https://quranmt-server.onrender.com/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error || 'Failed to delete student';
    }
  }
);

const initialState = {
    students: [],
    loading: false,
    error: null,
    msg:null,
}
export const studentSlice=createSlice({
    name:"students",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
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