import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profiles() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      setStudents(storedStudents.reverse());
    }
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(students.length / studentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const editData = (id) => {
    console.log(id);
    localStorage.setItem("edit_id_student", id);
    window.location.replace('/edit');
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">Student Information List</h1>

        <div className="flex justify-end mb-4">
          <Link to="/form" className="bg-blue-500 text-white p-2 px-4 rounded-full text-[16px] hover:bg-blue-600">
            + Add Student
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border table-profile">
            <thead>
              <tr>
                <th className="p-4 bg-[#eee]">Name</th>
                <th className='bg-[#eee]'>Email</th>
                <th className='bg-[#eee]'>Phone</th>
                <th className='bg-[#eee]'>Marks</th>
                <th className='bg-[#eee]'>Pass/Fail</th>
                <th className='bg-[#eee]'></th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index} className="border p-2">
                  <td className="p-4">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.number}</td>
                  <td>{student.marks}</td>
                  <td>{student.marks > 34 ? 'Pass' : 'Fail'}</td>
                  <td onClick={() => editData(student.id)}>
                    <button className="py-2 px-6 rounded-full bg-blue-500 text-white">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
  <h4 className='font-bold'>Page&nbsp;&nbsp;</h4>
  {pageNumbers.map((pageNumber) => (
    <button
      key={pageNumber}
      className={`mx-1 px-4 py-2 rounded-full ${
        pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  ))}
</div>

      </div>
    </div>
  );
}

export default Profiles;
