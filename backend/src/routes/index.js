// backend/src/routes/index.js

import express from 'express';
import {
  login, getPublicStats, createBridgeForPatient, closeEmergency,
  getDashboardStats, getBloodGroupStats, getPatients, getActiveEmergencies,
  getBloodBridges, getDuePatients, getLeaderboard, getInboxMessages,
  escalateEmergency, resolveInboxMessage, getConfig,
  getDonorDashboard, getPatientDashboard, updateDonorAvailability,
  getBridgeMembers, removeBridgeMember // <-- Import new functions
} from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRole from '../middleware/checkRole.js';

const router = express.Router();

// --- PUBLIC ROUTES ---
router.post('/admin/login', login);
router.get('/public/stats', getPublicStats);

// --- AUTHENTICATION MIDDLEWARE ---
router.use(authMiddleware);

// --- ADMIN-ONLY ROUTES ---
router.get('/admin/stats', checkRole(['Admin']), getDashboardStats);
router.get('/admin/stats/blood-groups', checkRole(['Admin']), getBloodGroupStats);
router.get('/admin/patients', checkRole(['Admin']), getPatients);
router.get('/admin/emergencies', checkRole(['Admin']), getActiveEmergencies);
router.get('/admin/leaderboard', checkRole(['Admin']), getLeaderboard);
router.get('/admin/inbox', checkRole(['Admin']), getInboxMessages);
router.post('/admin/patients/:patientId/create-bridge', checkRole(['Admin']), createBridgeForPatient);
router.post('/admin/emergencies/:requestId/close', checkRole(['Admin']), closeEmergency);
router.post('/admin/emergencies/:requestId/escalate', checkRole(['Admin']), escalateEmergency);
router.get('/admin/bridges/:bridgeId/members', checkRole(['Admin']), getBridgeMembers); // <-- ADDED
router.delete('/admin/bridges/members/:memberId', checkRole(['Admin']), removeBridgeMember); // <-- ADDED

// --- DONOR PORTAL ROUTES ---
router.get('/donor/dashboard', checkRole(['Donor', 'Admin']), getDonorDashboard);
router.put('/donor/availability', checkRole(['Donor', 'Admin']), updateDonorAvailability);

// --- PATIENT PORTAL ROUTE ---
router.get('/patient/dashboard', checkRole(['Patient', 'Admin']), getPatientDashboard);

export default router;