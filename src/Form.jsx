import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [marks, setMarks] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [marksError, setMarksError] = useState('');

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000); 
    return `${timestamp}-${random}`;
  };

  const handleSubmit = () => {
    setPhoneError('');
    setMarksError('');

    const existingDataJSON = localStorage.getItem('students');
    let existingData = [];
    existingDataJSON ? (existingData = JSON.parse(existingDataJSON)) : '';

    const studentId = generateUniqueId();

    const data = {
      id: studentId, 
      name: name,
      email: email,
      number: number,
      marks: marks,
    };

    if (number.length !== 10) {
      setPhoneError('Invalid Phone Number');
      return;
    }

    if (marks < 0 || marks > 100) {
      setMarksError('Marks must be between 0 and 100');
      return;
    }

    existingData.push(data);

    localStorage.setItem('students', JSON.stringify(existingData));
    window.location.replace('/');
  };

  return (
    <div>
      <div className="container mx-auto p-4 max-w-xl">
        <h1 className="text-3xl font-semibold mb-4">Add Student</h1>
        <form className="w-full">
          <div className="mb-4 w-full">
            <label className="block text-left p-2">Name</label>
            <input
              type="text"
              className="name border p-2 w-full"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left p-2">Email</label>
            <input
              type="email"
              className="email border p-2 w-full"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left p-2">Phone</label>
            <input
              type="number"
              className="number border p-2 w-full"
              placeholder="Enter phone number"
              required
              onChange={(e) => setNumber(e.target.value)}
            />
            {phoneError && <p className="text-red-500 text-left mt-2">{phoneError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-left p-2">Marks</label>
            <input
              type="number"
              className="marks border p-2 w-full"
              placeholder="Enter marks"
              required
              onChange={(e) => setMarks(e.target.value)}
            />
            {marksError && <p className="text-red-500 text-left mt-2">{marksError}</p>}
          </div>
          <Link to="/" className="mx-4 text-blue-500 border border-blue-500 bg-white p-2 px-4 rounded-full">
                Go Back
            </Link>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 px-4 rounded-full hover:bg-blue-600"
          >
            Add Student
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Form;
