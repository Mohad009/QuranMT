import mongoose from "mongoose";
const studentSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    teacherId:{type:mongoose.Schema.Types.ObjectId,ref: 'users',required:true},
    parentNumber:{type:Number,required:true,unique: true},
    hifz:{
        chapter:{type:[String],default:[]},
        ayahRange:{type:[String],default:[]},
        mark:{type:[Number],default:[]}
    }
})

const studentModel=mongoose.model('students',studentSchema)
export default studentModel