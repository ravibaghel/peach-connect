// src/auth.js
const API_BASE_URL = 'http://localhost:8080';

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Login failed');
  }
  const token = await response.text();
  return { token };
}

export async function register(data) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Registration failed');
  }
  return response.json();
}
