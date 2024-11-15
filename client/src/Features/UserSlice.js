import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
//login
export const login=createAsyncThunk('users/login',async(userData)=>{
    try{
        const response=await axios.post('http://localhost:5000/login',{pNumber:userData.pNumber,password:userData.password})
        const user=response.data.user
        const msg=response.data.msg
        return {user,msg}
    }catch(e){
        const msg=e.message
        return {msg}
    }
})

const initialState = {
    user:null,
    isloading:false,
    isSuccess:false,
    isError:false,
    msg:null,
    isLogin:false
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
            if (action.payload.user) {
              state.isSuccess = true;
              state.isLogin = true;
              state.user = action.payload.user;
              state.msg = action.payload.msg;
            } else {
              state.isSuccess = false;
              state.isLogin = false;
              state.msg = action.payload.msg;
            }
          
          })
          .addCase(login.rejected,(state,action)=>{
            console.log("login rejected")
            state.isloading=false
            state.msg=action.payload.msg
          })
    }
})

export default userSlice.reducer
