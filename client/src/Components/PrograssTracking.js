import React from "react";
const ProgressTracking = () => {
    return (
      <div className="flex h-screen">
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Progress Tracking</h2>
            </div>
          </header>
  
          <div className="p-6">
            <StudentSelect />
            <ProgressForm />
            <ProgressHistory />
          </div>
        </main>
      </div>
    );
  };
  
  export default ProgressTracking;



  const StudentSelect = () => {
    return (
      <div className="mb-6">
        <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Student
        </label>
        <select
          id="studentSelect"
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">Choose a student...</option>
          <option value="ST001">Ahmed Ali - ST001</option>
          <option value="ST002">Sara Khan - ST002</option>
        </select>
      </div>
    );
  };
  


  const ProgressForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
    };
  
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Record New Progress</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Surah</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                <option value="">Select Surah...</option>
                <option value="1">Al-Fatiha</option>
                <option value="2">Al-Baqarah</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ayah Range</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="From"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="number"
                  placeholder="To"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
  
            {/* Quality Rating and Type radio groups */}
            {/* ... Similar conversion for radio groups ... */}
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
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
    );
  };
  

  const ProgressHistory = () => {
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-09-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Al-Baqarah</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-5</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    New
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                    Excellent
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  