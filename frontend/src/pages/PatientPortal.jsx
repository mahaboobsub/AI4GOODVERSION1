// // import React from 'react';
// // import { Card } from '../components/ui/card';
// // import { Badge } from '../components/ui/badge';
// // import { Button } from '../components/ui/button';
// // import { Calendar, Heart, Activity, Users, Clock, AlertCircle, CheckCircle, Stethoscope, Zap } from 'lucide-react';
// // import { mockPatientData } from '../lib/mockData';

// // const PatientPortal = () => {
// //   const patient = mockPatientData;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="container mx-auto px-6 py-8">
// //         {/* Header Section */}
// //         <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
// //           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
// //           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
// //           <div className="flex items-center justify-between relative z-10">
// //             <div>
// //               <h1 className="text-3xl font-bold mb-2">
// //                 Hello, {patient.name}! 💚
// //               </h1>
// //               <p className="text-green-100 text-lg">
// //                 Your health journey is our priority
// //               </p>
// //               <div className="flex items-center gap-4 mt-4">
// //                 <Badge className="bg-white/20 text-white border-white/30">
// //                   Bridge Status: {patient.bridge_status}
// //                 </Badge>
// //                 <Badge className="bg-white/20 text-white border-white/30">
// //                   Health Score: {patient.health_score}%
// //                 </Badge>
// //                 <Badge className="bg-white/20 text-white border-white/30">
// //                   {patient.blood_group}
// //                 </Badge>
// //               </div>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
// //                 <Activity className="w-10 h-10 text-white animate-pulse" />
// //               </div>
// //               <div className="text-2xl font-bold">{patient.connected_donors}</div>
// //               <div className="text-sm text-green-100">Connected Donors</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Coming Soon Banner */}
// //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl mb-8">
// //           <div className="flex items-center gap-4">
// //             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
// //               <Heart className="w-6 h-6 text-blue-600" />
// //             </div>
// //             <div className="flex-1">
// //               <h3 className="text-lg font-semibold text-blue-800">Personalized Patient Features Launching Soon!</h3>
// //               <p className="text-blue-700">
// //                 Advanced health monitoring, appointment management, and direct donor communication are being finalized.
// //               </p>
// //             </div>
// //             <div className="hidden md:flex items-center gap-2">
// //               <Zap className="w-5 h-5 text-blue-600" />
// //               <span className="text-blue-700 font-medium">Phase 2</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Main Content */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Health Timeline */}
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
// //                 <Activity className="w-6 h-6 text-green-600" />
// //                 Health Timeline
// //               </h2>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
// //                       <Calendar className="w-6 h-6 text-red-600" />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-red-800">Next Transfusion</h3>
// //                       <p className="text-red-600">Countdown</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-center">
// //                     <div className="text-4xl font-bold text-red-700 mb-2">{patient.next_transfusion}</div>
// //                     <div className="text-red-600">Until next session</div>
// //                     <div className="mt-2 text-sm text-red-500">All preparations ready</div>
// //                   </div>
// //                 </Card>

// //                 <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
// //                       <CheckCircle className="w-6 h-6 text-green-600" />
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-green-800">Last Transfusion</h3>
// //                       <p className="text-green-600">Completed</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-center">
// //                     <div className="text-2xl font-bold text-green-700 mb-2">{patient.last_transfusion}</div>
// //                     <div className="text-green-600">Successfully completed</div>
// //                     <div className="mt-2 text-sm text-green-500">Excellent recovery</div>
// //                   </div>
// //                 </Card>
// //               </div>
// //             </div>

// //             {/* Blood Bridge Status */}
// //             <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
// //               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
// //                 <Users className="w-5 h-5 text-blue-600" />
// //                 Blood Bridge Network
// //               </h3>
// //               <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm">
// //                 <div className="flex items-center gap-4">
// //                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
// //                     <Users className="w-8 h-8 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <h4 className="text-xl font-bold text-blue-900">{patient.connected_donors} Active Donors</h4>
// //                     <p className="text-blue-700">Connected to your care network</p>
// //                     <Badge className="mt-2 bg-green-100 text-green-800">
// //                       Bridge Status: {patient.bridge_status}
// //                     </Badge>
// //                   </div>
// //                 </div>
// //                 <div className="text-center">
// //                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-2">
// //                     <CheckCircle className="w-10 h-10 text-white" />
// //                   </div>
// //                   <div className="text-sm font-medium text-green-700">Connected</div>
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Upcoming Appointments */}
// //             <Card className="p-6">
// //               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
// //                 <Calendar className="w-5 h-5 text-purple-600" />
// //                 Upcoming Appointments
// //               </h3>
// //               <div className="space-y-4">
// //                 {patient.upcoming_appointments.map((appointment, index) => (
// //                   <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
// //                     <div className="flex items-center gap-4">
// //                       <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
// //                         <Calendar className="w-6 h-6 text-purple-600" />
// //                       </div>
// //                       <div>
// //                         <div className="font-semibold text-gray-900">{appointment.type}</div>
// //                         <div className="text-gray-600">with {appointment.doctor}</div>
// //                         <div className="text-sm text-gray-500">{appointment.date}</div>
// //                       </div>
// //                     </div>
// //                     <Button variant="outline" size="sm" disabled>
// //                       Reschedule (Coming Soon)
// //                     </Button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </Card>
// //           </div>

// //           {/* Sidebar */}
// //           <div className="space-y-6">
// //             {/* Health Score */}
// //             <Card className="p-6">
// //               <div className="flex items-center gap-2 mb-4">
// //                 <Activity className="w-5 h-5 text-gray-600" />
// //                 <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
// //               </div>
// //               <div className="text-center">
// //                 <div className="w-24 h-24 mx-auto mb-4 relative">
// //                   <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
// //                     <path
// //                       className="text-gray-300"
// //                       stroke="currentColor"
// //                       strokeWidth="3"
// //                       fill="transparent"
// //                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
// //                     />
// //                     <path
// //                       className="text-green-500"
// //                       stroke="currentColor"
// //                       strokeWidth="3"
// //                       strokeDasharray={`${patient.health_score}, 100`}
// //                       fill="transparent"
// //                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
// //                     />
// //                   </svg>
// //                   <div className="absolute inset-0 flex items-center justify-center">
// //                     <span className="text-2xl font-bold text-green-600">{patient.health_score}%</span>
// //                   </div>
// //                 </div>
// //                 <p className="text-sm text-gray-600">Based on recent health metrics</p>
// //                 <div className="mt-3 flex items-center justify-center gap-1">
// //                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
// //                   <span className="text-xs text-green-600 font-medium">Excellent condition</span>
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Quick Actions */}
// //             <Card className="p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
// //               <div className="space-y-3">
// //                 <Button className="w-full bg-red-600 hover:bg-red-700" disabled>
// //                   <AlertCircle className="w-4 h-4 mr-2" />
// //                   Emergency Alert (Coming Soon)
// //                 </Button>
// //                 <Button className="w-full" variant="outline" disabled>
// //                   <Calendar className="w-4 h-4 mr-2" />
// //                   Schedule Appointment (Coming Soon)
// //                 </Button>
// //                 <Button className="w-full" variant="outline" disabled>
// //                   <Heart className="w-4 h-4 mr-2" />
// //                   Contact Bridge Donors (Coming Soon)
// //                 </Button>
// //                 <Button className="w-full" variant="outline" disabled>
// //                   <Clock className="w-4 h-4 mr-2" />
// //                   View Health History (Coming Soon)
// //                 </Button>
// //               </div>
// //             </Card>

// //             {/* Care Team */}
// //             <Card className="p-6">
// //               <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Team</h3>
// //               <div className="space-y-3">
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
// //                     <Stethoscope className="w-5 h-5 text-blue-600" />
// //                   </div>
// //                   <div>
// //                     <div className="font-medium text-sm">Dr. Sharma</div>
// //                     <div className="text-xs text-gray-500">Hematologist</div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
// //                     <Heart className="w-5 h-5 text-green-600" />
// //                   </div>
// //                   <div>
// //                     <div className="font-medium text-sm">Nurse Priya</div>
// //                     <div className="text-xs text-gray-500">Care Coordinator</div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
// //                   <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
// //                     <Users className="w-5 h-5 text-purple-600" />
// //                   </div>
// //                   <div>
// //                     <div className="font-medium text-sm">Support Team</div>
// //                     <div className="text-xs text-gray-500">24/7 Available</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Treatment Progress */}
// //             <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
// //               <h3 className="text-lg font-semibold text-indigo-900 mb-4">Treatment Progress</h3>
// //               <div className="space-y-3">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-indigo-700">This Month's Goal</span>
// //                   <span className="text-indigo-600 font-medium">90%</span>
// //                 </div>
// //                 <div className="w-full bg-indigo-200 rounded-full h-3">
// //                   <div className="bg-indigo-600 h-3 rounded-full animate-pulse" style={{ width: '90%' }}></div>
// //                 </div>
// //                 <p className="text-xs text-indigo-700">Excellent adherence to treatment plan!</p>
// //               </div>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PatientPortal;



// import React from 'react';
// import { Card } from '../components/ui/card';
// import { Badge } from '../components/ui/badge';
// import { Button } from '../components/ui/button';
// import { Calendar, Heart, Activity, Users, Clock, AlertCircle, CheckCircle, Stethoscope, Zap } from 'lucide-react';
// import { mockPatientData } from '../lib/mockData';

// const PatientPortal = () => {
//   const patient = mockPatientData;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
//           <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
//           <div className="flex items-center justify-between relative z-10">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">
//                 Hello, {patient.name}! 💚
//               </h1>
//               <p className="text-green-100 text-lg">
//                 Your health journey is our priority
//               </p>
//               <div className="flex items-center gap-4 mt-4">
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   Bridge Status: {patient.bridge_status}
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   Health Score: {patient.health_score}%
//                 </Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">
//                   {patient.blood_group}
//                 </Badge>
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
//                 <Activity className="w-10 h-10 text-white animate-pulse" />
//               </div>
//               <div className="text-2xl font-bold">{patient.connected_donors}</div>
//               <div className="text-sm text-green-100">Connected Donors</div>
//             </div>
//           </div>
//         </div>

//         {/* Coming Soon Banner */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-xl mb-8">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <Heart className="w-6 h-6 text-blue-600" />
//             </div>
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-blue-800">Personalized Patient Features Launching Soon!</h3>
//               <p className="text-blue-700">
//                 Advanced health monitoring, appointment management, and direct donor communication are being finalized.
//               </p>
//             </div>
//             <div className="hidden md:flex items-center gap-2">
//               <Zap className="w-5 h-5 text-blue-600" />
//               <span className="text-blue-700 font-medium">Phase 2</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Health Timeline */}
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                 <Activity className="w-6 h-6 text-green-600" />
//                 Health Timeline
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                       <Calendar className="w-6 h-6 text-red-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-red-800">Next Transfusion</h3>
//                       <p className="text-red-600">Countdown</p>
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-red-700 mb-2">{patient.next_transfusion}</div>
//                     <div className="text-red-600">Until next session</div>
//                     <div className="mt-2 text-sm text-red-500">All preparations ready</div>
//                   </div>
//                 </Card>

//                 <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                       <CheckCircle className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-green-800">Last Transfusion</h3>
//                       <p className="text-green-600">Completed</p>
//                     </div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-700 mb-2">{patient.last_transfusion}</div>
//                     <div className="text-green-600">Successfully completed</div>
//                     <div className="mt-2 text-sm text-green-500">Excellent recovery</div>
//                   </div>
//                 </Card>
//               </div>
//             </div>

//             {/* Blood Bridge Status */}
//             <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Users className="w-5 h-5 text-blue-600" />
//                 Blood Bridge Network
//               </h3>
//               <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Users className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-bold text-blue-900">{patient.connected_donors} Active Donors</h4>
//                     <p className="text-blue-700">Connected to your care network</p>
//                     <Badge className="mt-2 bg-green-100 text-green-800">
//                       Bridge Status: {patient.bridge_status}
//                     </Badge>
//                   </div>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-2">
//                     <CheckCircle className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="text-sm font-medium text-green-700">Connected</div>
//                 </div>
//               </div>
//             </Card>

//             {/* Upcoming Appointments */}
//             <Card className="p-6">
//               <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
//                 <Calendar className="w-5 h-5 text-purple-600" />
//                 Upcoming Appointments
//               </h3>
//               <div className="space-y-4">
//                 {patient.upcoming_appointments.map((appointment, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                         <Calendar className="w-6 h-6 text-purple-600" />
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-900">{appointment.type}</div>
//                         <div className="text-gray-600">with {appointment.doctor}</div>
//                         <div className="text-sm text-gray-500">{appointment.date}</div>
//                       </div>
//                     </div>
//                     <Button variant="outline" size="sm" disabled>
//                       Reschedule (Coming Soon)
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Health Score */}
//             <Card className="p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <Activity className="w-5 h-5 text-gray-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
//               </div>
//               <div className="text-center">
//                 <div className="w-24 h-24 mx-auto mb-4 relative">
//                   <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
//                     <path
//                       className="text-gray-300"
//                       stroke="currentColor"
//                       strokeWidth="3"
//                       fill="transparent"
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     />
//                     <path
//                       className="text-green-500"
//                       stroke="currentColor"
//                       strokeWidth="3"
//                       strokeDasharray={`${patient.health_score}, 100`}
//                       fill="transparent"
//                       d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                     />
//                   </svg>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <span className="text-2xl font-bold text-green-600">{patient.health_score}%</span>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600">Based on recent health metrics</p>
//                 <div className="mt-3 flex items-center justify-center gap-1">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs text-green-600 font-medium">Excellent condition</span>
//                 </div>
//               </div>
//             </Card>

//             {/* Quick Actions */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <Button className="w-full bg-red-600 hover:bg-red-700" disabled>
//                   <AlertCircle className="w-4 h-4 mr-2" />
//                   Emergency Alert (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Schedule Appointment (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Heart className="w-4 h-4 mr-2" />
//                   Contact Bridge Donors (Coming Soon)
//                 </Button>
//                 <Button className="w-full" variant="outline" disabled>
//                   <Clock className="w-4 h-4 mr-2" />
//                   View Health History (Coming Soon)
//                 </Button>
//               </div>
//             </Card>

//             {/* Care Team */}
//             <Card className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Team</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                     <Stethoscope className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-sm">Dr. Sharma</div>
//                     <div className="text-xs text-gray-500">Hematologist</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                     <Heart className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-sm">Nurse Priya</div>
//                     <div className="text-xs text-gray-500">Care Coordinator</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
//                     <Users className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <div className="font-medium text-sm">Support Team</div>
//                     <div className="text-xs text-gray-500">24/7 Available</div>
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Treatment Progress */}
//             <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
//               <h3 className="text-lg font-semibold text-indigo-900 mb-4">Treatment Progress</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-indigo-700">This Month's Goal</span>
//                   <span className="text-indigo-600 font-medium">90%</span>
//                 </div>
//                 <div className="w-full bg-indigo-200 rounded-full h-3">
//                   <div className="bg-indigo-600 h-3 rounded-full animate-pulse" style={{ width: '90%' }}></div>
//                 </div>
//                 <p className="text-xs text-indigo-700">Excellent adherence to treatment plan!</p>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientPortal;





// frontend/src/pages/PatientPortal.jsx

import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Heart, Activity, Users, Clock, AlertCircle, CheckCircle, Stethoscope, Zap } from 'lucide-react';
import { patientAPI } from '../lib/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PatientPortal = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await patientAPI.getDashboard();
        setPatientData(response.data);
      } catch (err) {
        setError("Could not fetch your dashboard data. Please try logging in again.");
        console.error("Failed to fetch patient data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          <p className="text-lg text-gray-600">Loading Your Health Portal...</p>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg p-4 text-center">
        {error || "An error occurred while loading your data."}
      </div>
    );
  }

  const patient = patientData; // Assign for easy compatibility with existing JSX

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hello, {patient.name}! 💚</h1>
              <p className="text-green-100 text-lg">Your health journey is our priority</p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge className="bg-white/20 text-white border-white/30">Bridge Status: {patient.bridge_status}</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Health Score: {patient.health_score}%</Badge>
                <Badge className="bg-white/20 text-white border-white/30">{patient.blood_group}</Badge>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-2xl font-bold">{patient.connected_donors}</div>
              <div className="text-sm text-green-100">Connected Donors</div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Timeline */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity className="w-6 h-6 text-green-600" />Health Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0"><Calendar className="w-6 h-6 text-red-600" /></div>
                    <div><h3 className="font-semibold text-red-800">Next Transfusion</h3><p className="text-red-600">Countdown</p></div>
                  </div>
                  <div className="text-center"><div className="text-4xl font-bold text-red-700 mb-2">{patient.next_transfusion}</div><div className="text-red-600">Until next session</div></div>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                    <div><h3 className="font-semibold text-green-800">Last Transfusion</h3><p className="text-green-600">Completed</p></div>
                  </div>
                  <div className="text-center"><div className="text-2xl font-bold text-green-700 mb-2">{patient.last_transfusion}</div><div className="text-green-600">Successfully completed</div></div>
                </div>
              </div>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-600" />Upcoming Appointments</h3>
              <div className="space-y-4">
                {patient.upcoming_appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0"><Calendar className="w-6 h-6 text-purple-600" /></div>
                      <div>
                        <div className="font-semibold text-gray-900">{appointment.type}</div>
                        <div className="text-gray-600">with {appointment.doctor}</div>
                        <div className="text-sm text-gray-500">{appointment.date}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" disabled>Reschedule (Coming Soon)</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-gray-600" /><h3 className="text-lg font-semibold text-gray-900">Health Score</h3></div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36"><path className="text-gray-200" stroke="currentColor" strokeWidth="3" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className="text-green-500" stroke="currentColor" strokeWidth="3" strokeDasharray={`${patient.health_score}, 100`} fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold text-green-600">{patient.health_score}%</span></div>
                </div>
                <p className="text-sm text-gray-600">Based on recent health metrics</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700" disabled><AlertCircle className="w-4 h-4 mr-2" />Emergency Alert (Coming Soon)</Button>
                <Button className="w-full" variant="outline" disabled><Calendar className="w-4 h-4 mr-2" />Schedule Appointment (Coming Soon)</Button>
                <Button className="w-full" variant="outline" disabled><Heart className="w-4 h-4 mr-2" />Contact Bridge Donors (Coming Soon)</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Care Team</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"><Stethoscope className="w-5 h-5 text-blue-600" /></div>
                  <div><div className="font-medium text-sm">Dr. Sharma</div><div className="text-xs text-gray-500">Hematologist</div></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><Heart className="w-5 h-5 text-green-600" /></div>
                  <div><div className="font-medium text-sm">Nurse Priya</div><div className="text-xs text-gray-500">Care Coordinator</div></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;