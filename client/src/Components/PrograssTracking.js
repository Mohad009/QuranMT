import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import surat from "../quranSurahData";
import { updateHifz } from "../Features/studentSlice";
import { progressValidationSchema } from "../Validation/progressValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ProgressTracking = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { students } = useSelector(state => state.students);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [formData, setFormData] = useState({
    chapter: '',
    ayahRangeFrom: '',
    ayahRangeTo: '',
    mark: '',
    notes: ''
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(progressValidationSchema),
    defaultValues: {
      studentId: '',
      chapter: '',
      ayahRangeFrom: '',
      ayahRangeTo: '',
      mark: '',
      notes: ''
    }
  });

  const onSubmit = (data) => {
    const combinedFormData = {
      chapter: data.chapter,
      ayahRange: `${data.ayahRangeFrom}-${data.ayahRangeTo}`,
      mark: data.mark,
      notes: data.notes
    };

    try {
      dispatch(updateHifz({
        studentId: data.studentId,
        hifzData: combinedFormData
      }));

      // Reset form after successful submission
      reset();
      setFormData({
        chapter: '',
        ayahRangeFrom: '',
        ayahRangeTo: '',
        mark: '',
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
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
              Select Student
            </label>
            <select
              id="studentId"
              {...register("studentId", {
                onChange: (e) => setSelectedStudent(e.target.value)
              })}
              className={`w-full md:w-1/3 px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 
                ${errors.studentId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Choose a student...</option>
              {students.map((s) =>
                <option value={s._id} key={s._id}>
                  {s.firstName} {s.lastName}
                </option>
              )}
            </select>
            {errors.studentId && (
              <p className="mt-1 text-sm text-red-600">{errors.studentId.message}</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Record New Progress</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surah</label>
                  <select
                    {...register("chapter", {
                      onChange: (e) => setFormData(prev => ({ ...prev, chapter: e.target.value }))
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500
                      ${errors.chapter ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select Surah...</option>
                    {surat.map((surah) => (
                      <option value={surah.surah} key={surah.surah}>{surah.name}</option>
                    ))}
                  </select>
                  {errors.chapter && (
                    <p className="mt-1 text-sm text-red-600">{errors.chapter.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ayah Range</label>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <input
                        type="number"
                        placeholder="From"
                        {...register("ayahRangeFrom", {
                          onChange: (e) => setFormData(prev => ({ ...prev, ayahRangeFrom: e.target.value }))
                        })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500
                          ${errors.ayahRangeFrom ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.ayahRangeFrom && (
                        <p className="mt-1 text-sm text-red-600">{errors.ayahRangeFrom.message}</p>
                      )}
                    </div>
                    <div className="w-1/2">
                      <input
                        type="number"
                        placeholder="To"
                        {...register("ayahRangeTo", {
                          onChange: (e) => setFormData(prev => ({ ...prev, ayahRangeTo: e.target.value }))
                        })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500
                          ${errors.ayahRangeTo ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.ayahRangeTo && (
                        <p className="mt-1 text-sm text-red-600">{errors.ayahRangeTo.message}</p>
                      )}
                    </div>
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
                          {...register("mark", {
                            onChange: (e) => setFormData(prev => ({ ...prev, mark: e.target.value }))
                          })}
                          value={value}
                          className={`form-radio text-emerald-600 focus:ring-emerald-500
                            ${errors.mark ? 'border-red-500' : ''}`}
                        />
                        <span className="ml-2">{value} - {label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.mark && (
                    <p className="mt-1 text-sm text-red-600">{errors.mark.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    {...register("notes", {
                      onChange: (e) => setFormData(prev => ({ ...prev, notes: e.target.value }))
                    })}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500
                      ${errors.notes ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Add any additional notes..."
                  />
                  {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                  )}
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
          <ProgressHistory studentsHifz={students} surah={surat} studentSelected={selectedStudent} />
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
  