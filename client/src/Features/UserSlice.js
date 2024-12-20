import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//register user
export const registerUser=createAsyncThunk('users/registerUser',(async(data)=>{
  try{
    const response=await axios.post("https://quranmt-server.onrender.com/registerUser",{
      name:data.name,
      PNumber:data.pNumber,
      utype:data.utype,
      isActive:data.isActive,
      password:data.password
    })
    const {user,msg}=response.data
    return ({user,msg})
  }catch(e){
    const msg=e.message
    return{msg}
  }
}))
//updatae the user
export const updateUser=createAsyncThunk('users/updateUser',(async({userId,userData})=>{
  try{
    const response=await axios.put(`https://quranmt-server.onrender.com/updateUser/${userId}`,{
      name:userData.name,
      pNumber:userData.pNumber,
      utype:userData.utype,
      isActive:userData.isActive,
      password:userData.password
    })
    const {msg,user}=response.data.msg
    return ({msg,user})
  }catch(e){
    const msg=e.message
return {msg}
  }
}))


// login
export const login = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://quranmt-server.onrender.com/login', {
                pNumber: userData.pNumber,
                password: userData.password
            });
            const user = response.data.user;
            const msg = response.data.msg;

            localStorage.setItem('user', JSON.stringify(user));
            return { user, msg };
        } catch (e) {
            const msg = e.response?.data?.msg || e.message;
            return rejectWithValue({ msg });
        }
    }
);

//logout
export const logout=createAsyncThunk("users/logout",async()=>{
    try{
      const response =await axios.post("https://quranmt-server.onrender.com/logout")
      localStorage.removeItem('user');
      const msg=response.data.msg
      return ({msg})
    }catch(e){
  console.log(e)
    }
  })

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  try {
    const response = await axios.get('https://quranmt-server.onrender.com/users');
    return response.data.users;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (userId) => {
  try {
    await axios.delete(`https://quranmt-server.onrender.com/users/${userId}`);
    return userId;
  } catch (error) {
    throw error;
  }
});

export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async ({ userId, userData }) => {
    try {
      const response = await axios.put(`https://quranmt-server.onrender.com/updateProfile/${userId}`, {
        name: userData.fullName,
        PNumber: userData.phoneNumber
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  async ({ userId, newPassword }) => {
    try {
      const response = await axios.put(`https://quranmt-server.onrender.com/updatePassword/${userId}`, {
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLogin: !!localStorage.getItem('user'),
    isloading:false,
    isSuccess:false,
    isError:false,
    msg:null,
    users:[]
    }
export const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

      builder.addCase(registerUser.pending,(state)=>{
        state.isloading=true
  
      }).addCase(registerUser.fulfilled,(state,action)=>{
          state.isloading = false;
          state.isSuccess = true;
          state.msg = action.payload.msg;
          if (action.payload.user) {
            state.users.push(action.payload.user);
          }
      
      })
      .addCase(registerUser.rejected,(state,action)=>{
       
        state.isloading=false
        state.msg=action.payload.msg
      })

      builder.addCase(updateUser.pending,(state)=>{
        state.isloading=true
  
      }).addCase(updateUser.fulfilled,(state,action)=>{
          state.isloading = false;
          state.isSuccess = true;
          state.msg = action.payload.msg;
          if (action.payload.user) {
            state.users.push(action.payload.user);
          }
      })
      .addCase(updateUser.rejected,(state,action)=>{
  
        state.isloading=false
        state.msg=action.payload.msg
      })

        builder.addCase(login.pending,(state)=>{
            console.log("login pending")
            state.isloading=true
      
          }).addCase(login.fulfilled,(state,action)=>{
              state.isSuccess = true;
              state.isLogin = true;
              state.user = action.payload.user;
              state.msg = action.payload.msg;
              
          
          })
          .addCase(login.rejected,(state,action)=>{
            console.log("login rejected")
            state.isloading=false
            state.msg=action.payload.msg
          })

          builder.addCase(logout.pending, (state) => {
            state.isloading = true;
          })
          .addCase(logout.fulfilled, (state,action) => {
            // Clear user data or perform additional cleanup if needed
            state.isLogin = false;
            state.user = null;
            state.msg = action.payload.msg;
          })
          .addCase(logout.rejected, (state) => {
            state.isError = true;
          });

          builder
            .addCase(fetchAllUsers.pending, (state) => {
              state.isloading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
              state.isloading = false;
              state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
              state.isloading = false;
              state.isError = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
              state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(updateProfile.pending, (state) => {
              state.isloading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
              state.isloading = false;
              state.user = action.payload.user;
              state.msg = action.payload.msg;
              localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(updateProfile.rejected, (state, action) => {
              state.isloading = false;
              state.isError = action.error.message;
            })
            .addCase(updatePassword.pending, (state) => {
              state.isloading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
              state.isloading = false;
              state.msg = action.payload.msg;
            })
            .addCase(updatePassword.rejected, (state, action) => {
              state.isloading = false;
              state.isError = action.error.message;
            });
    }
})

export default userSlice.reducer
