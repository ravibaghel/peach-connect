import React, { useEffect, useState } from 'react';
import Login from './Login';
import { fetchMessages, fetchStudents } from './api';
import Messages from './Messages';
import Notifications from './Notifications';
import StudentProfiles from './StudentProfiles';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('jwt'));
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jwt) {
      const payload = parseJwt(jwt);
      setRole(payload?.role);
      setUsername(payload?.sub);
    }
  }, [jwt]);

  useEffect(() => {
    if (jwt) {
      fetchMessages(jwt)
        .then(setMessages)
        .catch(err => setError(err.message));
      fetchStudents(jwt)
        .then(setStudents)
        .catch(() => {});
    }
  }, [jwt]);

  useEffect(() => {
    if (role === 'admin') {
      setFilteredStudents(students);
    } else if (role === 'teacher') {
      // For demo, filter by grade (simulate teacher assigned to grade)
      setFilteredStudents(students.filter(s => s.grade === 'Grade 1'));
    } else if (role === 'parent') {
      setFilteredStudents(students.filter(s => s.parentName === username));
    } else {
      setFilteredStudents([]);
    }
  }, [role, students, username]);

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} setJwt={setJwt} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Peach Connect</h1>
        <button className="absolute top-4 right-4 text-sm text-blue-600 underline" onClick={() => { localStorage.removeItem('jwt'); setLoggedIn(false); setJwt(null); }}>Logout</button>
        <p className="text-center text-gray-700">Welcome to the school-parent communication platform MVP.</p>
        <Notifications jwt={jwt} />
        <Messages jwt={jwt} />
        <StudentProfiles jwt={jwt} students={filteredStudents} role={role} />
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Messages</h2>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <ul className="space-y-2">
            {messages.length === 0 && !error && <li className="text-gray-400">No messages found.</li>}
            {messages.map(msg => (
              <li key={msg.id} className="border p-2 rounded text-gray-800">
                <strong>{msg.senderName}:</strong> {msg.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
