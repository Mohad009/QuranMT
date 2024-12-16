import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import surat from "../quranSurahData";
import { updateHifz } from "../Features/studentSlice";
const ProgressTracking = () => {
  const {user}=useSelector((state)=>state.users)
  const dispatch=useDispatch()
  const {students}=useSelector(state=>state.students)
  const [selectedStudent, setSelectedStudent] = useState('');
  const [formData, setFormData] = useState({
    chapter: '',
    ayahRangeFrom: '',
    ayahRangeTo: '',
    mark: 0,
    notes: ''
  });




  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit =  (e) => {
    e.preventDefault();
    
    const combinedFormData = {
      ...formData,
      ayahRange: `${formData.ayahRangeFrom}-${formData.ayahRangeTo}`,
    };
  
  // Remove the individual range fields
  delete combinedFormData.ayahRangeFrom;
  delete combinedFormData.ayahRangeTo;
  console.log(combinedFormData)
    try {
       dispatch(updateHifz({
        studentId: selectedStudent,
        hifzData: combinedFormData
      }));

      // Reset form after successful submission
      setFormData({
        chapter: '',
        ayahRangeFrom: '',
        ayahRangeTo: '',
        mark: 0,
        notes: ''
      });
      alert('Progress recorded successfully!');
    } catch (err) {
      alert('Failed to record progress: ' + err.message);
    }
  };
    return (
      <div className="flex h-screen">
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Progress Tracking</h2>
            </div>
          </header>
  
          <div className="p-6">
          <div className="mb-6">
        <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Student
        </label>
        <select
          id="studentSelect"
          value={selectedStudent}
          onChange={(e)=>setSelectedStudent(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option >Choose a student...</option>
   {students.map((s)=>
          <option value={s._id} key={s._id}>
            {s.firstName} {s.lastName}</option>
  )}

        </select>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Record New Progress</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surah</label>
              <select 
               name='chapter'
               value={formData.chapter}
                onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                <option value="">Select Surah...</option>
        {
          surat.map((surah)=>{
            return(
              <option value={surah.surah} key={surah.surah}>{surah.name}</option>
            )
          })
        }
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ayah Range</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="From"
                  name="ayahRangeFrom"
                  value={formData.ayahRangeFrom}
                  onChange={handleInputChange}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="number"
                  placeholder="To"
                  name="ayahRangeTo"
                  value={formData.ayahRangeTo}
                  onChange={handleInputChange}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
  
            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mark</label>
                  <div className="flex space-x-4">
                    {[
                      { value: "0", label: "Not Memorized" },
                      { value: "1", label: "Partially" },
                      { value: "2", label: "Fully Memorized" }
                    ].map(({ value, label }) => (
                      <label key={value} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="mark"
                          value={value}
                          checked={formData.mark === value}
                          onChange={handleInputChange}
                          className="form-radio text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ml-2">{value} - {label}</span>
                      </label>
                    ))}
                  </div>
                </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                onChange={handleInputChange}
                value={formData.notes}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Add any additional notes..."
              />
            </div>
          </div>
  
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700"
            >
              Save Progress
            </button>
          </div>
        </form>
      </div>
            <ProgressHistory studentsHifz={students} surah={surat} studentSelected={selectedStudent}/>
          </div>
        </main>
      </div>
    );
  };
  
  export default ProgressTracking;




  

  

  const ProgressHistory = ({studentsHifz,surah,studentSelected}) => {
    const filteredStudentsHifz=studentsHifz.filter((s)=>s._id===studentSelected)
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recent Progress History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ayah Range</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mark</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudentsHifz.map((s)=>s.hifz.map((h)=>(
              <tr key={h._id}>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(h.date).toLocaleDateString()}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{surah.find((s) => s.surah === h.chapter)?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.ayahRange}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{h.mark}</td>
            
              </tr>
                ))
                )}

            </tbody>
          </table>
        </div>
      </div>
    );
  };
  