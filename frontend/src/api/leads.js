const API = process.env.REACT_APP_API || 'http://localhost:5000/api';

function headers() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function handle(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const login = (username, password) =>
  fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(handle);

export const register = (username, password) =>
  fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  }).then(handle);

export const getLeads = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${API}/leads${q ? '?' + q : ''}`, { headers: headers() }).then(handle);
};

export const getLead = (id) =>
  fetch(`${API}/leads/${id}`, { headers: headers() }).then(handle);

export const createLead = (data) =>
  fetch(`${API}/leads`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

export const updateLead = (id, data) =>
  fetch(`${API}/leads/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

export const deleteLead = (id) =>
  fetch(`${API}/leads/${id}`, {
    method: 'DELETE',
    headers: headers(),
  }).then(handle);

export const addNote = (leadId, text) =>
  fetch(`${API}/leads/${leadId}/notes`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ text }),
  }).then(handle);

export const deleteNote = (leadId, noteId) =>
  fetch(`${API}/leads/${leadId}/notes/${noteId}`, {
    method: 'DELETE',
    headers: headers(),
  }).then(handle);
