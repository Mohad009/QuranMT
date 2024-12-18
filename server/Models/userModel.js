import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    PNumber:{type:Number,required:true,unique: true},
    utype:{type:String,required:true},
    isActive:{type:Boolean,required:true},
    password:{type:String,required:true}
})

const userModel=mongoose.model('users',userSchema)
export default userModel