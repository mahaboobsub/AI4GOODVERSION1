// import React, { useState } from 'react';
// import { Card } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
// import { Users, Clock, AlertCircle, CheckCircle, Link, Heart } from 'lucide-react';
// import { adminAPI } from '../../lib/api';
// import LoadingSpinner from '../common/LoadingSpinner';

// const PatientManagement = ({ patients, onRefetch }) => {
//   const [loading, setLoading] = useState(false);
//   const [showCreateBridge, setShowCreateBridge] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const pendingPatients = patients.filter(p => p.status === 'pending_verification');
//   const bridgedPatients = patients.filter(p => p.status === 'bridged');
//   const urgentPatients = patients.filter(p => p.status === 'urgent');

//   const handleCreateBridge = async (patientId) => {
//     setLoading(true);
//     try {
//       await adminAPI.createBridge(patientId);
//       setShowCreateBridge(false);
//       setSelectedPatient(null);
//       onRefetch();
//     } catch (error) {
//       console.error('Error creating bridge:', error);
//       alert('Failed to create bridge. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending_verification':
//         return <Clock className="w-4 h-4 text-yellow-600" />;
//       case 'bridged':
//         return <CheckCircle className="w-4 h-4 text-green-600" />;
//       case 'urgent':
//         return <AlertCircle className="w-4 h-4 text-red-600" />;
//       default:
//         return <Users className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'pending_verification':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'bridged':
//         return 'bg-green-100 text-green-800';
//       case 'urgent':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const PatientCard = ({ patient, showBridgeButton = false }) => (
//     <Card className="p-6 hover:shadow-lg transition-all duration-300">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <Users className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
//             <p className="text-sm text-gray-600">Age {patient.age} • {patient.blood_group}</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           {getStatusIcon(patient.status)}
//           <Badge className={getStatusColor(patient.status)}>
//             {patient.status.replace('_', ' ')}
//           </Badge>
//         </div>
//       </div>

//       <div className="space-y-2 mb-4">
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-600">Location:</span>
//           <span className="font-medium">{patient.location}</span>
//         </div>
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-600">Condition:</span>
//           <span className="font-medium">{patient.condition}</span>
//         </div>
//         {patient.hemoglobin_level && (
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Hemoglobin:</span>
//             <span className={`font-medium ${patient.hemoglobin_level < 7 ? 'text-red-600' : 'text-green-600'}`}>
//               {patient.hemoglobin_level} g/dL
//             </span>
//           </div>
//         )}
//         {patient.next_due_date && (
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Next Due:</span>
//             <span className="font-medium">{patient.next_due_date}</span>
//           </div>
//         )}
//         {patient.bridge_donors && patient.bridge_donors.length > 0 && (
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Bridge Donors:</span>
//             <span className="font-medium text-green-600">{patient.bridge_donors.length} connected</span>
//           </div>
//         )}
//       </div>

//       {showBridgeButton && (
//         <Button
//           onClick={() => {
//             setSelectedPatient(patient);
//             setShowCreateBridge(true);
//           }}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//         >
//           <Link className="w-4 h-4 mr-2" />
//           Create Blood Bridge
//         </Button>
//       )}
//     </Card>
//   );

//   return (
//     <div className="space-y-8">
//       {/* Pending Verification */}
//       <div>
//         <div className="flex items-center gap-2 mb-6">
//           <Clock className="w-5 h-5 text-yellow-600" />
//           <h2 className="text-xl font-semibold text-gray-900">Pending Verification</h2>
//           <Badge className="bg-yellow-100 text-yellow-800">{pendingPatients.length}</Badge>
//         </div>
        
//         {pendingPatients.length === 0 ? (
//           <Card className="p-8 text-center">
//             <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
//             <p className="text-gray-600">No patients pending verification</p>
//           </Card>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {pendingPatients.map((patient) => (
//               <PatientCard key={patient.id} patient={patient} showBridgeButton={true} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Urgent Cases */}
//       {urgentPatients.length > 0 && (
//         <div>
//           <div className="flex items-center gap-2 mb-6">
//             <AlertCircle className="w-5 h-5 text-red-600" />
//             <h2 className="text-xl font-semibold text-gray-900">Urgent Cases</h2>
//             <Badge className="bg-red-100 text-red-800">{urgentPatients.length}</Badge>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {urgentPatients.map((patient) => (
//               <PatientCard key={patient.id} patient={patient} showBridgeButton={true} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Bridged Patients Monitor */}
//       <div>
//         <div className="flex items-center gap-2 mb-6">
//           <Heart className="w-5 h-5 text-green-600" />
//           <h2 className="text-xl font-semibold text-gray-900">Active Blood Bridges</h2>
//           <Badge className="bg-green-100 text-green-800">{bridgedPatients.length}</Badge>
//         </div>
        
//         {bridgedPatients.length === 0 ? (
//           <Card className="p-8 text-center">
//             <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-600">No active blood bridges yet</p>
//           </Card>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bridgedPatients.map((patient) => (
//               <PatientCard key={patient.id} patient={patient} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Create Bridge Confirmation Dialog */}
//       <Dialog open={showCreateBridge} onOpenChange={setShowCreateBridge}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Link className="w-5 h-5 text-blue-600" />
//               Create Blood Bridge
//             </DialogTitle>
//           </DialogHeader>
//           <div className="py-6">
//             {selectedPatient && (
//               <div className="space-y-4">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Heart className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     {selectedPatient.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Age {selectedPatient.age} • {selectedPatient.blood_group} • {selectedPatient.condition}
//                   </p>
//                 </div>
                
//                 <div className="bg-blue-50 p-4 rounded-lg text-center">
//                   <p className="text-sm text-blue-700 mb-4">
//                     Creating a blood bridge will connect this patient with 3-5 compatible donors
//                     for regular, coordinated blood supply management.
//                   </p>
                  
//                   <div className="flex justify-center gap-3">
//                     <Button
//                       variant="outline"
//                       onClick={() => setShowCreateBridge(false)}
//                       disabled={loading}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={() => handleCreateBridge(selectedPatient.id)}
//                       disabled={loading}
//                       className="bg-blue-600 hover:bg-blue-700"
//                     >
//                       {loading ? (
//                         <>
//                           <LoadingSpinner size="sm" className="mr-2" />
//                           Creating...
//                         </>
//                       ) : (
//                         'Create Bridge'
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default PatientManagement;


// frontend/src/components/admin/PatientManagement.jsx

import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Users, Clock, AlertCircle, CheckCircle, Link, Heart, Trash2, UserCheck, UserX } from 'lucide-react';
import { adminAPI } from '../../lib/api';
import LoadingSpinner from '../common/LoadingSpinner';

const PatientManagement = ({ patients, onRefetch }) => {
  const [modalState, setModalState] = useState({
    createBridge: false,
    viewMembers: false,
    confirmDelete: false,
  });
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [bridgeMembers, setBridgeMembers] = useState([]);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const pendingPatients = patients.filter(p => p.status === 'pending_verification');
  const bridgedPatients = patients.filter(p => p.status === 'bridged');

  const handleCreateBridge = async (patientId) => {
    setLoading(true);
    try {
      await adminAPI.createBridge(patientId);
      setModalState({ ...modalState, createBridge: false });
      onRefetch();
    } catch (error) {
      console.error('Error creating bridge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMembers = async (patient) => {
    if (!patient || !patient.bridge_id) {
        console.warn("Cannot view members: Patient has no associated bridge ID.");
        return;
    }
    setSelectedPatient(patient);
    setLoading(true);
    setModalState({ ...modalState, viewMembers: true });
    try {
        const response = await adminAPI.getBridgeMembers(patient.bridge_id);
        setBridgeMembers(response.data);
    } catch (error) {
      console.error('Error fetching bridge members:', error);
      setBridgeMembers([]); // Clear members on error
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveMember = async () => {
    if (!memberToRemove) return;
    setLoading(true);
    try {
      await adminAPI.removeBridgeMember(memberToRemove.member_id);
      // Refresh the member list after successful removal
      await handleViewMembers(selectedPatient);
    } catch (error) {
      console.error('Error removing member:', error);
    } finally {
      setLoading(false);
      setModalState({ ...modalState, confirmDelete: false });
      setMemberToRemove(null);
    }
  };

  const confirmRemoveMember = (member) => {
    setMemberToRemove(member);
    setModalState({ ...modalState, confirmDelete: true });
  };

  const PatientCard = ({ patient }) => (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Users className="w-6 h-6 text-blue-600" /></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-600">{patient.blood_group} • {patient.location}</p>
            </div>
          </div>
          <Badge className={patient.status === 'bridged' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
            {patient.status.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-4"><strong>Condition:</strong> {patient.condition}</p>
      </div>
      <div className="mt-auto">
        {patient.status === 'pending_verification' && (
          <Button onClick={() => { setSelectedPatient(patient); setModalState({ ...modalState, createBridge: true }); }} className="w-full bg-blue-600 hover:bg-blue-700"><Link className="w-4 h-4 mr-2" />Create Blood Bridge</Button>
        )}
        {patient.status === 'bridged' && (
          <Button onClick={() => handleViewMembers(patient)} className="w-full"><Users className="w-4 h-4 mr-2" />View Bridge Members</Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Pending Verification */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Verification ({pendingPatients.length})</h2>
        {pendingPatients.length === 0 ? <Card className="p-8 text-center"><p className="text-gray-600">No patients are pending verification.</p></Card> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{pendingPatients.map((p) => <PatientCard key={p.id} patient={p} />)}</div>}
      </div>
      
      {/* Bridged Patients */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Blood Bridges ({bridgedPatients.length})</h2>
        {bridgedPatients.length === 0 ? <Card className="p-8 text-center"><p className="text-gray-600">No patients currently have a Blood Bridge.</p></Card> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{bridgedPatients.map((p) => <PatientCard key={p.id} patient={p} />)}</div>}
      </div>

      {/* View Bridge Members Modal */}
      <Dialog open={modalState.viewMembers} onOpenChange={() => setModalState({ ...modalState, viewMembers: false })}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bridge Members for {selectedPatient?.name}</DialogTitle>
            <DialogDescription>Donors committed to providing regular support.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {loading ? <LoadingSpinner /> : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {bridgeMembers.map(member => (
                  <div key={member.member_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.phone} • {member.blood_group}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant={member.availability_status === 'available' ? 'default' : 'destructive'} className={member.availability_status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {member.availability_status}
                        </Badge>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:bg-red-100" onClick={() => confirmRemoveMember(member)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Member Removal Dialog */}
      <AlertDialog open={modalState.confirmDelete} onOpenChange={() => setModalState({ ...modalState, confirmDelete: false })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <span className="font-bold">{memberToRemove?.name}</span> from the blood bridge. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember} className="bg-red-600 hover:bg-red-700">
              {loading ? <LoadingSpinner size="sm" /> : "Yes, Remove Donor"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PatientManagement;