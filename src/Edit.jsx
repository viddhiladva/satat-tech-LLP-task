import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Edit = () => {
  const [students, setStudents] = useState([]);
  const [editedStudent, setEditedStudent] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [marksError, setMarksError] = useState('');

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    setStudents(storedStudents);
    const idToEdit = localStorage.getItem('edit_id_student');
    const studentToEdit = storedStudents.find((student) => student.id === idToEdit);
    setEditedStudent(studentToEdit);
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();

    const updatedName = event.target.name.value;
    const updatedEmail = event.target.email.value;
    const updatedNumber = event.target.number.value;
    const updatedMarks = event.target.marks.value;

    // Validate phone number (must be 10 digits)
    if (updatedNumber.length !== 10) {
      setPhoneError('Invalid Phone Number (must be 10 digits)');
      return;
    } else {
      setPhoneError('');
    }

    // Validate marks (must be between 0 and 100)
    if (updatedMarks < 0 || updatedMarks > 100) {
      setMarksError('Marks must be between 0 and 100');
      return;
    } else {
      setMarksError('');
    }

    const updatedStudent = {
      ...editedStudent,
      name: updatedName,
      email: updatedEmail,
      number: updatedNumber,
      marks: updatedMarks,
    };

    const studentIndex = students.findIndex((student) => student.id === editedStudent.id);

    const updatedStudents = [...students];
    updatedStudents[studentIndex] = updatedStudent;

    localStorage.setItem('students', JSON.stringify(updatedStudents));

    window.location.replace('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      {editedStudent ? (
        <div>
          <h2 className="text-3xl font-semibold mb-4">Edit Student</h2>
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label className="block text-left p-2">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={editedStudent.name}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left p-2">Email:</label>
              <input
                type="email"
                name="email"
                defaultValue={editedStudent.email}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left p-2">Phone:</label>
              <input
                type="number"
                name="number"
                defaultValue={editedStudent.number}
                className="border p-2 w-full"
                required
              />
              {phoneError && <p className="text-red-500 text-left mt-2">{phoneError}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-left p-2">Marks:</label>
              <input
                type="number"
                name="marks"
                defaultValue={editedStudent.marks}
                className="border p-2 w-full"
                required
              />
              {marksError && <p className="text-red-500 text-left mt-2">{marksError}</p>}
            </div>
            <Link
              to="/"
              className="mx-4 text-blue-500 border border-blue-500 bg-white p-2 px-4 rounded-full"
            >
              Go Back
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 px-4 rounded-full hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <p className="text-red-500">Student not found.</p>
      )}
    </div>
  );
};

export default Edit;
