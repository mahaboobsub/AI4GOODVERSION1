// import axios from 'axios';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API_BASE = `${BACKEND_URL}/api`;

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('bloodbridge_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem('bloodbridge_token');
//       localStorage.removeItem('bloodbridge_user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   adminLogin: (credentials) => api.post('/admin/login', credentials),
// };

// // Admin API
// export const adminAPI = {
//   getStats: () => api.get('/admin/stats'),
//   getBloodGroupStats: () => api.get('/admin/stats/blood-groups'),
//   getLeaderboard: () => api.get('/admin/leaderboard'),
//   getPatients: (status) => api.get('/admin/patients', { params: { status } }),
//   createBridge: (patientId) => api.post(`/admin/patients/${patientId}/create-bridge`),
//   getEmergencies: () => api.get('/admin/emergencies'),
//   closeEmergency: (emergencyId) => api.post(`/admin/emergencies/${emergencyId}/close`),
//   escalateEmergency: (emergencyId) => api.post(`/admin/emergencies/${emergencyId}/escalate`),
//   getInbox: () => api.get('/admin/inbox'),
//   resolveMessage: (messageId) => api.post(`/admin/inbox/${messageId}/resolve`),
// };

// // Public API
// export const publicAPI = {
//   getStats: () => api.get('/public/stats'),
//   healthCheck: () => api.get('/health'),
// };

// export default api;

// frontend/src/lib/api.js

import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
const API_BASE = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bloodbridge_token');
  if (token && !config.url.includes('/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('bloodbridge_token');
      localStorage.removeItem('bloodbridge_user');
      if (window.location.pathname !== '/login') window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getBloodGroupStats: () => api.get('/admin/stats/blood-groups'),
  getLeaderboard: () => api.get('/admin/leaderboard'),
  getPatients: () => api.get('/admin/patients'),
  createBridge: (patientId) => api.post(`/admin/patients/${patientId}/create-bridge`),
  getEmergencies: () => api.get('/admin/emergencies'),
  closeEmergency: (emergencyId) => api.post(`/admin/emergencies/${emergencyId}/close`),
  escalateEmergency: (emergencyId) => api.post(`/admin/emergencies/${emergencyId}/escalate`),
  getInbox: () => api.get('/admin/inbox'),
  resolveMessage: (messageId) => api.post(`/admin/inbox/${messageId}/resolve`),
  // ADD THESE TWO NEW FUNCTIONS
  getBridgeMembers: (bridgeId) => api.get(`/admin/bridges/${bridgeId}/members`),
  removeBridgeMember: (memberId) => api.delete(`/admin/bridges/members/${memberId}`),
};

export const donorAPI = {
  getDashboard: () => api.get('/donor/dashboard'),
  updateAvailability: (status) => api.put('/donor/availability', { availability_status: status }),
};

export const patientAPI = {
  getDashboard: () => api.get('/patient/dashboard'),
};

export const publicAPI = {
  getStats: () => api.get('/public/stats'),
};

export default api;