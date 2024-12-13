import mongoose from "mongoose";
const attendanceSchema = mongoose.Schema({
  date: { type: Date, required: true, unique: true },  // Date of attendance
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers', required: true },
  records: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
      status: { type: String, enum: ['Present', 'Absent'], required: true},
    }
  ]
});

const attendanceModel = mongoose.model('attendanceRecords', attendanceSchema);
export default attendanceModel;
