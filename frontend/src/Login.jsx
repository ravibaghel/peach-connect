import React, { useState } from 'react';
import { login, register } from './auth';

export default function Login({ setLoggedIn, setJwt }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', role: 'parent' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      if (isRegister) {
        await register(form);
        setSuccess('Registration successful! You can now log in.');
        setIsRegister(false);
      } else {
        const res = await login(form.username, form.password);
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setJwt(res.token);
          setLoggedIn(true);
        }
        setSuccess('Login successful!');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-blue-600">{isRegister ? 'Register' : 'Login'}</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <input name="username" type="text" placeholder="Username" value={form.username} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
        {isRegister && (
          <select name="role" value={form.role} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold mb-2">{isRegister ? 'Register' : 'Login'}</button>
        <button type="button" className="w-full text-blue-600 underline" onClick={() => { setIsRegister(!isRegister); setError(null); setSuccess(null); }}>
          {isRegister ? 'Already have an account? Login' : 'No account? Register'}
        </button>
      </form>
    </div>
  );
}
