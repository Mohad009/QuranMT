import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
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

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isLogin: !!localStorage.getItem('user'),
    isloading:false,
    isSuccess:false,
    isError:false,
    msg:null,
    }
export const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
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
    }
})

export default userSlice.reducer
