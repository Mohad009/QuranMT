import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//register user
export const registerUser=createAsyncThunk('users/registerUser',(async(data)=>{
  try{
    const response=await axios.post("http://localhost:5000/registerUser",{
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
//login
export const login=createAsyncThunk('users/login',async(userData)=>{
    try{
        const response=await axios.post('http://localhost:5000/login',{pNumber:userData.pNumber,password:userData.password})
        const user=response.data.user
        localStorage.setItem('user', JSON.stringify(user));
        const msg=response.data.msg
        return {user,msg}
    }catch(e){
        const msg=e.message
        return {msg}
    }
})

//logout
export const logout=createAsyncThunk("users/logout",async()=>{
    try{
      const response =await axios.post("http://localhost:5000/logout")
      localStorage.removeItem('user');
      const msg=response.data.msg
      return ({msg})
    }catch(e){
  console.log(e)
    }
  })

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    return response.data.users;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (userId) => {
  try {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    return userId;
  } catch (error) {
    throw error;
  }
});

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
        console.log("login rejected")
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
            });
    }
})

export default userSlice.reducer
