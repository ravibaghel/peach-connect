// src/api.js
const API_BASE_URL = 'http://localhost:8080';

function getAuthHeaders(jwt, extra = {}) {
  const headers = { ...extra };
  if (jwt) headers['Authorization'] = `Bearer ${jwt}`;
  console.log('API Request Headers:', headers); // Debug
  return headers;
}

export async function fetchMessages(jwt) {
  const response = await fetch(`${API_BASE_URL}/api/messages`, {
    headers: getAuthHeaders(jwt)
  });
  if (!response.ok) return [];
  return await response.json();
}

export async function sendMessage(data, jwt) {
  const response = await fetch(`${API_BASE_URL}/api/messages`, {
    method: 'POST',
    headers: getAuthHeaders(jwt, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(data)
  });
  if (!response.ok) return false;
  return response.ok;
}

export async function fetchNotifications(jwt) {
  const response = await fetch(`${API_BASE_URL}/api/notifications`, {
    headers: getAuthHeaders(jwt)
  });
  if (!response.ok) return [];
  return await response.json();
}
export async function fetchStudents(jwt) {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    headers: getAuthHeaders(jwt)
  });
  if (!response.ok) return [];
  return await response.json();
}

export async function createStudent(data, jwt) {
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: 'POST',
    headers: getAuthHeaders(jwt, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to create student');
  return await response.json();
}

export async function updateStudent(id, data, jwt) {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(jwt, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to update student');
  return await response.json();
}

export async function deleteStudent(id, jwt) {
  const response = await fetch(`${API_BASE_URL}/api/students/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(jwt)
  });
  if (!response.ok) throw new Error('Failed to delete student');
  return true;
}
