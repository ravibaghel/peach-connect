import React, { useEffect, useState } from 'react';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from './api';

export default function StudentProfiles({ jwt, students, role }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', grade: '', parentName: '', email: '', phone: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // students are now passed as prop and already filtered by role

  const handleSelect = student => {
    setSelected(student);
    setForm({ ...student });
    setError(null);
    setSuccess(null);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (selected) {
        await updateStudent(selected.id, form, jwt);
        setSuccess('Student updated!');
      } else {
        await createStudent(form, jwt);
        setSuccess('Student added!');
      }
      fetchStudents(jwt).then(setStudents);
      setSelected(null);
      setForm({ firstName: '', lastName: '', grade: '', parentName: '', email: '', phone: '' });
    } catch (err) {
      setError('Error saving student');
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(id, jwt);
      fetchStudents(jwt).then(setStudents);
      setSelected(null);
      setForm({ firstName: '', lastName: '', grade: '', parentName: '', email: '', phone: '' });
    }
  };

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-bold mb-2">Student Profiles</h2>
      <ul className="list-disc pl-5 mb-4">
        {students.map(s => (
          <li key={s.id} className="mb-1 text-sm cursor-pointer" onClick={() => handleSelect(s)}>
            {s.firstName} {s.lastName} ({s.grade})
            {role === 'admin' && (
              <button className="ml-2 text-red-500" onClick={e => { e.stopPropagation(); handleDelete(s.id); }}>Delete</button>
            )}
          </li>
        ))}
      </ul>
      {(role === 'admin' || role === 'teacher') && (
        <form className="bg-gray-50 p-4 rounded" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="mb-2 p-2 border rounded w-full" required />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="mb-2 p-2 border rounded w-full" required />
          <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade" className="mb-2 p-2 border rounded w-full" />
          <input name="parentName" value={form.parentName} onChange={handleChange} placeholder="Parent Name" className="mb-2 p-2 border rounded w-full" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="mb-2 p-2 border rounded w-full" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="mb-2 p-2 border rounded w-full" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded font-semibold w-full">{selected ? 'Update' : 'Add'} Student</button>
          {selected && <button type="button" className="w-full text-blue-600 underline mt-2" onClick={() => { setSelected(null); setForm({ firstName: '', lastName: '', grade: '', parentName: '', email: '', phone: '' }); }}>Cancel</button>}
        </form>
      )}
    </div>
  );
}
