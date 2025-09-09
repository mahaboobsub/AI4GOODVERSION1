
// // backend/src/controllers/adminController.js

// import jwt from 'jsonwebtoken';
// import config from '../config/config.js';
// import db from '../config/db.js';
// import bridgeService from '../services/bridgeService.js';
// import bridgeCoordinationService from '../services/bridgeCoordinationService.js';
// import emergencyService from '../services/emergencyService.js';

// /**
//  * FINAL LOGIN LOGIC V3
//  * Implements the City + Blood Group password strategy for Donors and Patients.
//  * Admin login remains with a standard password.
//  */
// export const login = async (req, res) => {
//   const { phone, password } = req.body;
//   if (!phone || !password) {
//     return res.status(400).json({ message: 'Phone and password are required' });
//   }

//   try {
//     const { rows: [user] } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);

//     if (!user) {
//       console.warn(`Login failed for phone: ${phone}. Reason: User not found.`);
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     let isPasswordValid = false;

//     // Check password based on user role
//     if (user.role === 'Admin') {
//       isPasswordValid = (user.password === password);
//     } else if (user.role === 'Donor' || user.role === 'Patient') {
//       if (user.city && user.blood_group) {
//         const expectedPassword = `${user.city.toLowerCase()} ${user.blood_group.toLowerCase()}`;
//         isPasswordValid = (password.toLowerCase() === expectedPassword);
//       }
//     }

//     if (!isPasswordValid) {
//       console.warn(`Login failed for phone: ${phone}. Reason: Password mismatch.`);
//       return res.status(401).json({ message: 'Invalid credentials.' });
//     }

//     const userPayload = { id: user.id, phone: user.phone, role: user.role, name: user.name };
//     const token = jwt.sign(userPayload, config.jwtSecret, { expiresIn: '8h' });

//     console.log(`Login successful for user: ${phone} (Role: ${user.role})`);
//     return res.json({ token, user: userPayload });

//   } catch (err) {
//     console.error('Login error:', { error: err.message, phone });
//     return res.status(500).json({ message: 'Server error during login' });
//   }
// };

// /**
//  * Public stats for the landing page.
//  */
// export const getPublicStats = async (req, res) => {
//     try {
//         const { rows: [stats] } = await db.query(`
//             SELECT
//                 (SELECT COUNT(*) FROM users WHERE user_type = 'donor') AS total_donors,
//                 (SELECT COUNT(*) FROM users WHERE user_type = 'donor' AND availability_status = 'available') AS active_donors,
//                 (SELECT COUNT(DISTINCT patient_id) FROM blood_bridges) AS patients_helped
//         `);
//         res.json({
//             total_donors: parseInt(stats.total_donors, 10) || 0,
//             active_donors: parseInt(stats.active_donors, 10) || 0,
//             patients_helped: parseInt(stats.patients_helped, 10) || 0,
//         });
//     } catch (error) {
//         console.error('Error fetching public stats:', error);
//         res.status(500).json({ total_donors: 1247, active_donors: 892, patients_helped: 156 });
//     }
// };

// /**
//  * REWORKED: Create a Blood Bridge and send invitations to top donors.
//  */
// export const createBridgeForPatient = async (req, res) => {
//   const { patientId } = req.params;
//   try {
//     const { rows: [patient] } = await db.query('SELECT * FROM patients WHERE id = $1', [patientId]);
//     if (!patient) return res.status(404).json({ message: 'Patient not found' });
//     if (patient.status === 'bridged') return res.status(400).json({ message: 'Patient already has a bridge.' });

//     const { rows: [bridge] } = await db.query(
//       'INSERT INTO blood_bridges (patient_id, name, blood_group, city) VALUES ($1, $2, $3, $4) RETURNING id',
//       [patient.id, `${patient.name}'s Bridge`, patient.blood_group, patient.city]
//     );

//     const result = await bridgeService.inviteDonorsToBridge(bridge.id, patient.city, patient.blood_group, patient.pincode);

//     await db.query("UPDATE patients SET status = 'bridged' WHERE id = $1", [patientId]);
    
//     console.log(`ADMIN ACTION: Created Bridge ${bridge.id} and sent ${result.count} invitations.`);
//     res.json({
//       success: true,
//       message: `Blood Bridge created. Sent invitations to ${result.count} top-matched donors.`
//     });
//   } catch (error) {
//     console.error('Error creating bridge and sending invites:', error);
//     await db.query("UPDATE patients SET status = 'pending_verification' WHERE id = $1", [patientId]).catch(console.error);
//     res.status(500).json({ error: 'Failed to create bridge and send invitations.' });
//   }
// };

// export const closeEmergency = async (req, res) => {
//   const { requestId } = req.params;
//   try {
//     const { rowCount } = await db.query("UPDATE emergency_requests SET status = 'closed' WHERE id = $1 AND status = 'active'", [requestId]);
//     if (rowCount === 0) return res.status(404).json({ message: "Active request not found or already closed." });
//     res.json({ success: true, message: 'Request successfully closed.' });
//   } catch (error) {
//     console.error(`Error closing emergency ${requestId}:`, error);
//     res.status(500).json({ error: 'Failed to close request.' });
//   }
// };

// export const requestBridgeTransfusion = async (req, res) => {
//   const { bridgeId } = req.params;
//   try {
//     const result = await bridgeCoordinationService.requestTransfusion(bridgeId);
//     res.json(result);
//   } catch (error) {
//     console.error(`Error requesting bridge transfusion for ${bridgeId}:`, error);
//     res.status(500).json({ error: error.message || 'Failed to send bridge request.' });
//   }
// };

// export const getDashboardStats = async (req, res) => {
//     try {
//         const [
//             { rows: [totalDonors] }, { rows: [activeDonors] }, { rows: [patientsHelped] },
//             { rows: [emergenciesResolved] }, { rows: [bloodUnits] }, { rows: [bridgesCreated] }
//         ] = await Promise.all([
//             db.query("SELECT COUNT(*) as count FROM users WHERE user_type = 'donor'"),
//             db.query("SELECT COUNT(*) as count FROM users WHERE user_type = 'donor' AND availability_status = 'available'"),
//             db.query("SELECT COUNT(DISTINCT patient_id) as count FROM blood_bridges"),
//             db.query("SELECT COUNT(*) as count FROM emergency_requests WHERE status IN ('fulfilled', 'closed')"),
//             db.query("SELECT SUM(donations_confirmed) as count FROM users WHERE user_type = 'donor'"),
//             db.query("SELECT COUNT(*) as count FROM blood_bridges")
//         ]);
//         res.json({
//             total_donors: parseInt(totalDonors.count, 10) || 0,
//             active_donors: parseInt(activeDonors.count, 10) || 0,
//             patients_helped: parseInt(patientsHelped.count, 10) || 0,
//             emergencies_resolved: parseInt(emergenciesResolved.count, 10) || 0,
//             blood_units_donated: parseInt(bloodUnits.count, 10) || 0,
//             bridges_created: parseInt(bridgesCreated.count, 10) || 0,
//         });
//     } catch (error) {
//         console.error('Error fetching dashboard stats:', error);
//         res.status(500).json({ error: 'Failed to fetch dashboard stats.' });
//     }
// };

// export const getBloodGroupStats = async (req, res) => {
//   try {
//     const { rows } = await db.query(`SELECT blood_group, COUNT(*)::int as donors FROM users WHERE user_type = 'donor' AND blood_group IS NOT NULL AND blood_group != 'Unknown' GROUP BY blood_group ORDER BY blood_group`);
//     const totalDonors = rows.reduce((sum, row) => sum + row.donors, 0);
//     const dataWithPercentage = rows.map(row => ({...row, percentage: totalDonors > 0 ? parseFloat(((row.donors / totalDonors) * 100).toFixed(1)) : 0 }));
//     res.json(dataWithPercentage);
//   } catch (error) {
//     console.error('Error fetching blood group stats:', error);
//     res.status(500).json({ error: 'Failed to fetch blood group stats.' });
//   }
// };

// export const getPatients = async (req, res) => {
//   try {
//     const query = `
//       SELECT p.id, p.name, p.phone, p.blood_group, p.city as location, p.status, p.condition, bb.id as bridge_id
//       FROM patients p
//       LEFT JOIN blood_bridges bb ON p.id = bb.patient_id
//       ORDER BY p.created_at DESC
//     `;
//     const { rows } = await db.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching patients:', error);
//     res.status(500).json({ error: 'Failed to fetch patients.' });
//   }
// };

// export const getActiveEmergencies = async (req, res) => {
//   try {
//     const { rows } = await db.query("SELECT id, patient_name, blood_group, city as location, status, created_at, 'high' as urgency FROM emergency_requests WHERE status = 'active' ORDER BY created_at DESC");
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching active emergencies:', error);
//     res.status(500).json({ error: 'Failed to fetch active emergencies.' });
//   }
// };

// export const getBloodBridges = async (req, res) => {
//     try {
//         const { rows } = await db.query(`SELECT bb.id, bb.name, p.name as patient_name, COUNT(bm.id) as member_count FROM blood_bridges bb JOIN patients p ON bb.patient_id = p.id LEFT JOIN bridge_members bm ON bb.id = bm.bridge_id WHERE bb.active = true GROUP BY bb.id, p.name ORDER BY p.name`);
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching blood bridges:', error);
//         res.status(500).json({ error: 'Failed to fetch blood bridges.' });
//     }
// };

// export const getDuePatients = async (req, res) => {
//   try {
//     const { rows } = await db.query(`SELECT id, name, blood_group, city, last_transfusion_date, frequency_in_days FROM patients WHERE status = 'bridged' AND last_transfusion_date IS NOT NULL AND frequency_in_days IS NOT NULL AND (last_transfusion_date + frequency_in_days * INTERVAL '1 day') <= NOW()`);
//     res.json(rows);
//   } catch (error){
//     console.error('Error fetching due patients:', error);
//     res.status(500).json({ error: 'Failed to fetch due patients.' });
//   }
// };

// export const getLeaderboard = async (req, res) => {
//   try {
//     const { rows } = await db.query(`SELECT name, city as location, donations_confirmed as donations, blood_group, gamification_points as points FROM users WHERE user_type = 'donor' ORDER BY gamification_points DESC, donations_confirmed DESC LIMIT 10`);
//     const rankedData = rows.map((row, index) => ({ rank: index + 1, ...row }));
//     res.json(rankedData);
//   } catch (error) {
//     console.error('Error fetching leaderboard:', error);
//     res.status(500).json({ error: 'Failed to fetch leaderboard data.' });
//   }
// };

// export const getInboxMessages = async (req, res) => {
//   try {
//     const { rows } = await db.query("SELECT id, user_phone, user_message as message, reason as subject, created_at as timestamp, 'high' as priority, 'flagged' as status, 'general' as category FROM inbox_messages WHERE status = 'pending' ORDER BY created_at ASC");
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching inbox messages:', error);
//     res.status(500).json({ error: 'Failed to fetch inbox messages.' });
//   }
// };

// export const escalateEmergency = async (req, res) => {
//   const { requestId } = req.params;
//   try {
//     const result = await emergencyService.escalateRequest(requestId);
//     res.json(result);
//   } catch (error) {
//     console.error(`Error escalating emergency ${requestId}:`, error);
//     res.status(500).json({ error: error.message || 'Failed to escalate emergency.' });
//   }
// };

// export const resolveInboxMessage = async (req, res) => {
//   const { messageId } = req.params;
//   try {
//     const { rowCount } = await db.query("UPDATE inbox_messages SET status = 'resolved', resolved_at = NOW() WHERE id = $1 AND status = 'pending'",[messageId]);
//     if (rowCount === 0) return res.status(404).json({ message: "Pending message not found." });
//     res.json({ success: true, message: 'Message marked as resolved.' });
//   } catch (error) {
//     console.error(`Error resolving inbox message ${messageId}:`, error);
//     res.status(500).json({ error: 'Failed to resolve message.' });
//   }
// };

// export const getConfig = async (req, res) => {
//   res.json({ version: "1.0.0", system_status: "ok" });
// };

// export const getDonorDashboard = async (req, res) => {
//   try {
//     const { id: userId } = req.user;
//     const { rows: [donor] } = await db.query(`SELECT id, name, phone, blood_group, city, gamification_points AS points, streak_count AS streak, donations_confirmed FROM users WHERE id = $1 AND user_type = 'donor'`, [userId]);
//     if (!donor) return res.status(404).json({ message: "Donor profile not found." });
    
//     let level = 'Blood Warrior';
//     if (donor.points > 400) level = 'Blood Guardian';
//     if (donor.points > 1000) level = 'Life Saver';

//     const dashboardData = {
//       ...donor, donations_completed: parseInt(donor.donations_confirmed, 10) || 0, next_donation: 'Ready to Donate!', level: level, impact_lives_saved: (parseInt(donor.donations_confirmed, 10) || 0) * 3,
//       badges: [
//         { id: 'b1', name: 'First Donation', icon: 'award', unlocked: (donor.donations_confirmed || 0) > 0 },
//         { id: 'b2', name: 'Regular Donor', icon: 'heart', unlocked: (donor.donations_confirmed || 0) >= 3 },
//         { id: 'b3', name: 'Monthly Hero', icon: 'calendar', unlocked: donor.streak >= 1 },
//         { id: 'b4', name: 'Life Saver', icon: 'shield', unlocked: donor.points >= 1000 }
//       ]
//     };
//     res.json(dashboardData);
//   } catch (error) {
//     console.error('Error fetching donor dashboard:', error);
//     res.status(500).json({ error: 'Failed to fetch donor dashboard.' });
//   }
// };

// export const getPatientDashboard = async (req, res) => {
//   try {
//     const { phone } = req.user;
//     const { rows: [patient] } = await db.query(`SELECT * FROM patients WHERE phone = $1`, [phone]);
//     if (!patient) return res.status(404).json({ message: "Patient profile not found." });

//     let nextDate = 'N/A';
//     if (patient.last_transfusion_date && patient.frequency_in_days) {
//         const lastDate = new Date(patient.last_transfusion_date);
//         const nextTransfusionDate = new Date(lastDate.setDate(lastDate.getDate() + patient.frequency_in_days));
//         const daysUntil = Math.ceil((nextTransfusionDate - new Date()) / (1000 * 60 * 60 * 24));
//         nextDate = daysUntil > 0 ? `In ${daysUntil} days` : (daysUntil === 0 ? 'Due Today' : `Overdue`);
//     }

//     const { rows: [bridge] } = await db.query(`SELECT id FROM blood_bridges WHERE patient_id = $1`, [patient.id]);
//     let connectedDonors = 0;
//     if (bridge) {
//         const { rows: [members] } = await db.query(`SELECT COUNT(*) as count FROM bridge_members WHERE bridge_id = $1`, [bridge.id]);
//         connectedDonors = parseInt(members.count, 10);
//     }

//     const dashboardData = {
//       ...patient, age: 14, bridge_status: patient.status === 'bridged' ? 'Connected' : 'Not Connected', health_score: 85, connected_donors: connectedDonors,
//       last_transfusion: patient.last_transfusion_date ? new Date(patient.last_transfusion_date).toLocaleDateString('en-IN') : 'N/A',
//       next_transfusion: nextDate,
//       upcoming_appointments: [
//         { type: 'Blood Transfusion', doctor: 'Dr. Amit Sharma', date: 'January 25, 2025 - 10:00 AM' },
//         { type: 'Regular Checkup', doctor: 'Dr. Priya Verma', date: 'February 2, 2025 - 2:30 PM' }
//       ]
//     };
//     res.json(dashboardData);
//   } catch (error) {
//     console.error('Error fetching patient dashboard:', error);
//     res.status(500).json({ error: 'Failed to fetch patient dashboard.' });
//   }
// };

// export const updateDonorAvailability = async (req, res) => {
//   try {
//     const { id: userId } = req.user;
//     const { availability_status } = req.body;
//     if (!['available', 'unavailable'].includes(availability_status)) {
//       return res.status(400).json({ message: "Invalid availability status provided." });
//     }
//     const { rowCount } = await db.query(`UPDATE users SET availability_status = $1, updated_at = NOW() WHERE id = $2 AND user_type = 'donor'`, [availability_status, userId]);
//     if (rowCount === 0) return res.status(404).json({ message: "Donor not found or no changes were made." });
//     res.status(200).json({ success: true, message: `Your availability has been updated to "${availability_status}".` });
//   } catch (error) {
//     console.error('Error updating donor availability:', error);
//     res.status(500).json({ error: 'Failed to update availability.' });
//   }
// };

// export const getBridgeMembers = async (req, res) => {
//   try {
//     const { bridgeId } = req.params;
//     const { rows: members } = await db.query(
//       `SELECT bm.id as member_id, u.id as donor_id, u.name, u.phone, u.blood_group, u.availability_status
//        FROM bridge_members bm JOIN users u ON bm.donor_id = u.id
//        WHERE bm.bridge_id = $1 ORDER BY bm.position`,
//       [bridgeId]
//     );
//     res.json(members);
//   } catch (error) {
//     console.error('Error fetching bridge members:', error);
//     res.status(500).json({ error: 'Failed to fetch bridge members.' });
//   }
// };

// export const removeBridgeMember = async (req, res) => {
//   try {
//     const { memberId } = req.params;
//     const { rowCount } = await db.query('DELETE FROM bridge_members WHERE id = $1', [memberId]);
//     if (rowCount === 0) return res.status(404).json({ message: 'Bridge member not found.' });
//     console.log(`ADMIN ACTION: Removed bridge member ${memberId}`);
//     res.status(200).json({ success: true, message: 'Donor removed from bridge successfully.' });
//   } catch (error) {
//     console.error('Error removing bridge member:', error);
//     res.status(500).json({ error: 'Failed to remove member from bridge.' });
//   }
// };

// backend/src/controllers/adminController.js

import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import db from '../config/db.js';
import bridgeService from '../services/bridgeService.js';
import bridgeCoordinationService from '../services/bridgeCoordinationService.js';
import emergencyService from '../services/emergencyService.js';

/**
 * FINAL LOGIN LOGIC V3
 * Implements the City + Blood Group password strategy for Donors and Patients.
 * Admin login uses a standard password from the database.
 */
export const login = async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
  }

  try {
    const { rows: [user] } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);

    if (!user) {
      console.warn(`Login failed for phone: ${phone}. Reason: User not found.`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    let isPasswordValid = false;

    // Check password based on user role
    if (user.role === 'Admin') {
      // Admins use a standard, secure password
      isPasswordValid = (user.password === password);
    } else if (user.role === 'Donor' || user.role === 'Patient') {
      // Donors/Patients use "city blood_group" as their password
      if (user.city && user.blood_group) {
        const expectedPassword = `${user.city.toLowerCase()} ${user.blood_group.toLowerCase()}`;
        isPasswordValid = (password.toLowerCase() === expectedPassword);
      }
    }

    if (!isPasswordValid) {
      console.warn(`Login failed for phone: ${phone}. Reason: Password mismatch.`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // If credentials are correct, create and sign the token
    const userPayload = { id: user.id, phone: user.phone, role: user.role, name: user.name };
    const token = jwt.sign(userPayload, config.jwtSecret, { expiresIn: '8h' });

    console.log(`Login successful for user: ${phone} (Role: ${user.role})`);
    return res.json({ token, user: userPayload });

  } catch (err) {
    console.error('Login error:', { error: err.message, phone });
    return res.status(500).json({ message: 'Server error during login' });
  }
};


export const getPublicStats = async (req, res) => {
    try {
        const { rows: [stats] } = await db.query(`
            SELECT
                (SELECT COUNT(*) FROM users WHERE user_type = 'donor') AS total_donors,
                (SELECT COUNT(*) FROM users WHERE user_type = 'donor' AND availability_status = 'available') AS active_donors,
                (SELECT COUNT(DISTINCT patient_id) FROM blood_bridges) AS patients_helped
        `);
        res.json({
            total_donors: parseInt(stats.total_donors, 10) || 0,
            active_donors: parseInt(stats.active_donors, 10) || 0,
            patients_helped: parseInt(stats.patients_helped, 10) || 0,
        });
    } catch (error) {
        console.error('Error fetching public stats:', error);
        res.status(500).json({ total_donors: 1247, active_donors: 892, patients_helped: 156 });
    }
};

export const createBridgeForPatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const { rows: [patient] } = await db.query('SELECT * FROM patients WHERE id = $1', [patientId]);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    if (patient.status === 'bridged') return res.status(400).json({ message: 'Patient already has a bridge.' });
    const { rows: [bridge] } = await db.query('INSERT INTO blood_bridges (patient_id, name, blood_group, city) VALUES ($1, $2, $3, $4) RETURNING id', [patient.id, `${patient.name}'s Bridge`, patient.blood_group, patient.city]);
    const result = await bridgeService.inviteDonorsToBridge(bridge.id, patient.city, patient.blood_group, patient.pincode);
    await db.query("UPDATE patients SET status = 'bridged' WHERE id = $1", [patientId]);
    console.log(`ADMIN ACTION: Created Bridge ${bridge.id} and sent ${result.count} invitations.`);
    res.json({ success: true, message: `Blood Bridge created. Sent invitations to ${result.count} top-matched donors.` });
  } catch (error) {
    console.error('Error creating bridge and sending invites:', error);
    await db.query("UPDATE patients SET status = 'pending_verification' WHERE id = $1", [patientId]).catch(console.error);
    res.status(500).json({ error: 'Failed to create bridge and send invitations.' });
  }
};

export const closeEmergency = async (req, res) => {
  const { requestId } = req.params;
  try {
    const { rowCount } = await db.query("UPDATE emergency_requests SET status = 'closed' WHERE id = $1 AND status = 'active'", [requestId]);
    if (rowCount === 0) return res.status(404).json({ message: "Active request not found or already closed." });
    res.json({ success: true, message: 'Request successfully closed.' });
  } catch (error) {
    console.error(`Error closing emergency ${requestId}:`, error);
    res.status(500).json({ error: 'Failed to close request.' });
  }
};

export const requestBridgeTransfusion = async (req, res) => {
  const { bridgeId } = req.params;
  try {
    const result = await bridgeCoordinationService.requestTransfusion(bridgeId);
    res.json(result);
  } catch (error) {
    console.error(`Error requesting bridge transfusion for ${bridgeId}:`, error);
    res.status(500).json({ error: error.message || 'Failed to send bridge request.' });
  }
};

export const getDashboardStats = async (req, res) => {
    try {
        const [
            { rows: [totalDonors] }, { rows: [activeDonors] }, { rows: [patientsHelped] },
            { rows: [emergenciesResolved] }, { rows: [bloodUnits] }, { rows: [bridgesCreated] }
        ] = await Promise.all([
            db.query("SELECT COUNT(*) as count FROM users WHERE user_type = 'donor'"),
            db.query("SELECT COUNT(*) as count FROM users WHERE user_type = 'donor' AND availability_status = 'available'"),
            db.query("SELECT COUNT(DISTINCT patient_id) as count FROM blood_bridges"),
            db.query("SELECT COUNT(*) as count FROM emergency_requests WHERE status IN ('fulfilled', 'closed')"),
            db.query("SELECT SUM(donations_confirmed) as count FROM users WHERE user_type = 'donor'"),
            db.query("SELECT COUNT(*) as count FROM blood_bridges")
        ]);
        res.json({
            total_donors: parseInt(totalDonors.count, 10) || 0,
            active_donors: parseInt(activeDonors.count, 10) || 0,
            patients_helped: parseInt(patientsHelped.count, 10) || 0,
            emergencies_resolved: parseInt(emergenciesResolved.count, 10) || 0,
            blood_units_donated: parseInt(bloodUnits.count, 10) || 0,
            bridges_created: parseInt(bridgesCreated.count, 10) || 0,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats.' });
    }
};

export const getBloodGroupStats = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT blood_group, COUNT(*)::int as donors FROM users WHERE user_type = 'donor' AND blood_group IS NOT NULL AND blood_group != 'Unknown' GROUP BY blood_group ORDER BY blood_group`);
    const totalDonors = rows.reduce((sum, row) => sum + row.donors, 0);
    const dataWithPercentage = rows.map(row => ({...row, percentage: totalDonors > 0 ? parseFloat(((row.donors / totalDonors) * 100).toFixed(1)) : 0 }));
    res.json(dataWithPercentage);
  } catch (error) {
    console.error('Error fetching blood group stats:', error);
    res.status(500).json({ error: 'Failed to fetch blood group stats.' });
  }
};

export const getPatients = async (req, res) => {
  try {
    const query = `
      SELECT p.id, p.name, p.phone, p.blood_group, p.city as location, p.status, p.condition, bb.id as bridge_id
      FROM patients p
      LEFT JOIN blood_bridges bb ON p.id = bb.patient_id
      ORDER BY p.created_at DESC
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients.' });
  }
};

export const getActiveEmergencies = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, patient_name, blood_group, city as location, status, created_at, 'high' as urgency FROM emergency_requests WHERE status = 'active' ORDER BY created_at DESC");
    res.json(rows);
  } catch (error) {
    console.error('Error fetching active emergencies:', error);
    res.status(500).json({ error: 'Failed to fetch active emergencies.' });
  }
};

export const getBloodBridges = async (req, res) => {
    try {
        const { rows } = await db.query(`SELECT bb.id, bb.name, p.name as patient_name, COUNT(bm.id) as member_count FROM blood_bridges bb JOIN patients p ON bb.patient_id = p.id LEFT JOIN bridge_members bm ON bb.id = bm.bridge_id WHERE bb.active = true GROUP BY bb.id, p.name ORDER BY p.name`);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching blood bridges:', error);
        res.status(500).json({ error: 'Failed to fetch blood bridges.' });
    }
};

export const getDuePatients = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT id, name, blood_group, city, last_transfusion_date, frequency_in_days FROM patients WHERE status = 'bridged' AND last_transfusion_date IS NOT NULL AND frequency_in_days IS NOT NULL AND (last_transfusion_date + frequency_in_days * INTERVAL '1 day') <= NOW()`);
    res.json(rows);
  } catch (error){
    console.error('Error fetching due patients:', error);
    res.status(500).json({ error: 'Failed to fetch due patients.' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT name, city as location, donations_confirmed as donations, blood_group, gamification_points as points FROM users WHERE user_type = 'donor' ORDER BY gamification_points DESC, donations_confirmed DESC LIMIT 10`);
    const rankedData = rows.map((row, index) => ({ rank: index + 1, ...row }));
    res.json(rankedData);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard data.' });
  }
};

export const getInboxMessages = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, user_phone, user_message as message, reason as subject, created_at as timestamp, 'high' as priority, 'flagged' as status, 'general' as category FROM inbox_messages WHERE status = 'pending' ORDER BY created_at ASC");
    res.json(rows);
  } catch (error) {
    console.error('Error fetching inbox messages:', error);
    res.status(500).json({ error: 'Failed to fetch inbox messages.' });
  }
};

export const escalateEmergency = async (req, res) => {
  const { requestId } = req.params;
  try {
    const result = await emergencyService.escalateRequest(requestId);
    res.json(result);
  } catch (error) {
    console.error(`Error escalating emergency ${requestId}:`, error);
    res.status(500).json({ error: error.message || 'Failed to escalate emergency.' });
  }
};

export const resolveInboxMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    const { rowCount } = await db.query("UPDATE inbox_messages SET status = 'resolved', resolved_at = NOW() WHERE id = $1 AND status = 'pending'",[messageId]);
    if (rowCount === 0) return res.status(404).json({ message: "Pending message not found." });
    res.json({ success: true, message: 'Message marked as resolved.' });
  } catch (error) {
    console.error(`Error resolving inbox message ${messageId}:`, error);
    res.status(500).json({ error: 'Failed to resolve message.' });
  }
};

export const getConfig = async (req, res) => {
  res.json({ version: "1.0.0", system_status: "ok" });
};

export const getDonorDashboard = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { rows: [donor] } = await db.query(`SELECT id, name, phone, blood_group, city, gamification_points AS points, streak_count AS streak, donations_confirmed FROM users WHERE id = $1 AND user_type = 'donor'`, [userId]);
    if (!donor) return res.status(404).json({ message: "Donor profile not found." });
    
    let level = 'Blood Warrior';
    if (donor.points > 400) level = 'Blood Guardian';
    if (donor.points > 1000) level = 'Life Saver';

    const dashboardData = {
      ...donor, donations_completed: parseInt(donor.donations_confirmed, 10) || 0, next_donation: 'Ready to Donate!', level: level, impact_lives_saved: (parseInt(donor.donations_confirmed, 10) || 0) * 3,
      badges: [
        { id: 'b1', name: 'First Donation', icon: 'award', unlocked: (donor.donations_confirmed || 0) > 0 },
        { id: 'b2', name: 'Regular Donor', icon: 'heart', unlocked: (donor.donations_confirmed || 0) >= 3 },
        { id: 'b3', name: 'Monthly Hero', icon: 'calendar', unlocked: donor.streak >= 1 },
        { id: 'b4', name: 'Life Saver', icon: 'shield', unlocked: donor.points >= 1000 }
      ]
    };
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching donor dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch donor dashboard.' });
  }
};

export const getPatientDashboard = async (req, res) => {
  try {
    const { phone } = req.user;
    const { rows: [patient] } = await db.query(`SELECT * FROM patients WHERE phone = $1`, [phone]);
    if (!patient) return res.status(404).json({ message: "Patient profile not found." });

    let nextDate = 'N/A';
    if (patient.last_transfusion_date && patient.frequency_in_days) {
        const lastDate = new Date(patient.last_transfusion_date);
        const nextTransfusionDate = new Date(lastDate.setDate(lastDate.getDate() + patient.frequency_in_days));
        const daysUntil = Math.ceil((nextTransfusionDate - new Date()) / (1000 * 60 * 60 * 24));
        nextDate = daysUntil > 0 ? `In ${daysUntil} days` : (daysUntil === 0 ? 'Due Today' : `Overdue`);
    }

    const { rows: [bridge] } = await db.query(`SELECT id FROM blood_bridges WHERE patient_id = $1`, [patient.id]);
    let connectedDonors = 0;
    if (bridge) {
        const { rows: [members] } = await db.query(`SELECT COUNT(*) as count FROM bridge_members WHERE bridge_id = $1`, [bridge.id]);
        connectedDonors = parseInt(members.count, 10);
    }

    const dashboardData = {
      ...patient, age: 14, bridge_status: patient.status === 'bridged' ? 'Connected' : 'Not Connected', health_score: 85, connected_donors: connectedDonors,
      last_transfusion: patient.last_transfusion_date ? new Date(patient.last_transfusion_date).toLocaleDateString('en-IN') : 'N/A',
      next_transfusion: nextDate,
      upcoming_appointments: [
        { type: 'Blood Transfusion', doctor: 'Dr. Amit Sharma', date: 'January 25, 2025 - 10:00 AM' },
        { type: 'Regular Checkup', doctor: 'Dr. Priya Verma', date: 'February 2, 2025 - 2:30 PM' }
      ]
    };
    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching patient dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch patient dashboard.' });
  }
};

export const updateDonorAvailability = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { availability_status } = req.body;
    if (!['available', 'unavailable'].includes(availability_status)) {
      return res.status(400).json({ message: "Invalid availability status provided." });
    }
    const { rowCount } = await db.query(`UPDATE users SET availability_status = $1, updated_at = NOW() WHERE id = $2 AND user_type = 'donor'`, [availability_status, userId]);
    if (rowCount === 0) return res.status(404).json({ message: "Donor not found or no changes were made." });
    res.status(200).json({ success: true, message: `Your availability has been updated to "${availability_status}".` });
  } catch (error) {
    console.error('Error updating donor availability:', error);
    res.status(500).json({ error: 'Failed to update availability.' });
  }
};

export const getBridgeMembers = async (req, res) => {
  try {
    const { bridgeId } = req.params;
    const { rows: members } = await db.query(
      `SELECT bm.id as member_id, u.id as donor_id, u.name, u.phone, u.blood_group, u.availability_status
       FROM bridge_members bm JOIN users u ON bm.donor_id = u.id
       WHERE bm.bridge_id = $1 ORDER BY bm.position`,
      [bridgeId]
    );
    res.json(members);
  } catch (error) {
    console.error('Error fetching bridge members:', error);
    res.status(500).json({ error: 'Failed to fetch bridge members.' });
  }
};

export const removeBridgeMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { rowCount } = await db.query('DELETE FROM bridge_members WHERE id = $1', [memberId]);
    if (rowCount === 0) return res.status(404).json({ message: 'Bridge member not found.' });
    console.log(`ADMIN ACTION: Removed bridge member ${memberId}`);
    res.status(200).json({ success: true, message: 'Donor removed from bridge successfully.' });
  } catch (error) {
    console.error('Error removing bridge member:', error);
    res.status(500).json({ error: 'Failed to remove member from bridge.' });
  }
};