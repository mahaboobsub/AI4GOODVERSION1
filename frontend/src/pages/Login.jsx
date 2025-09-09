// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Card } from '../components/ui/card';
// // import { Button } from '../components/ui/button';
// // import { Input } from '../components/ui/input';
// // import { Label } from '../components/ui/label';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
// // import { Heart, Shield, Users, Activity, AlertCircle, CheckCircle } from 'lucide-react';
// // import { useAuth } from '../context/AuthContext';
// // import { authAPI } from '../lib/api';
// // import LoadingSpinner from '../components/common/LoadingSpinner';

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();
// //   const [loading, setLoading] = useState(false);
// //   const [showComingSoon, setShowComingSoon] = useState(false);
// //   const [comingSoonType, setComingSoonType] = useState('');
// //   const [error, setError] = useState('');
// //   const [adminForm, setAdminForm] = useState({
// //     phone: '+918000000000',
// //     password: 'admin123'
// //   });

// //   const handleAdminLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     try {
// //       const response = await authAPI.adminLogin(adminForm);
// //       const { user, token } = response.data;
      
// //       login(user, token);
// //       navigate('/admin');
// //     } catch (error) {
// //       console.error('Login failed:', error);
// //       setError(error.response?.data?.detail || 'Login failed. Please check your credentials.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleComingSoon = (type) => {
// //     setComingSoonType(type);
// //     setShowComingSoon(true);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
// //       <div className="w-full max-w-md">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
// //             <Heart className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
// //           <p className="text-gray-600">Access your BloodBridge AI portal</p>
// //           <p className="text-sm text-red-600 font-medium mt-2">🩸 Thalassemia-Free India 2030</p>
// //         </div>

// //         {/* Login Tabs */}
// //         <Card className="p-6 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
// //           <Tabs defaultValue="admin" className="w-full">
// //             <TabsList className="grid w-full grid-cols-3 mb-6">
// //               <TabsTrigger value="admin" className="flex items-center gap-2">
// //                 <Shield className="w-4 h-4" />
// //                 Admin
// //               </TabsTrigger>
// //               <TabsTrigger value="donor" className="flex items-center gap-2">
// //                 <Users className="w-4 h-4" />
// //                 Donor
// //               </TabsTrigger>
// //               <TabsTrigger value="patient" className="flex items-center gap-2">
// //                 <Activity className="w-4 h-4" />
// //                 Patient
// //               </TabsTrigger>
// //             </TabsList>

// //             {/* Admin Login */}
// //             <TabsContent value="admin" className="space-y-4">
// //               <form onSubmit={handleAdminLogin} className="space-y-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="admin-phone">Phone Number</Label>
// //                   <Input
// //                     id="admin-phone"
// //                     type="tel"
// //                     value={adminForm.phone}
// //                     onChange={(e) => setAdminForm({...adminForm, phone: e.target.value})}
// //                     placeholder="+91 98765 43210"
// //                     required
// //                     className="border-red-200 focus:border-red-400"
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <Label htmlFor="admin-password">Password</Label>
// //                   <Input
// //                     id="admin-password"
// //                     type="password"
// //                     value={adminForm.password}
// //                     onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
// //                     placeholder="Enter your password"
// //                     required
// //                     className="border-red-200 focus:border-red-400"
// //                   />
// //                 </div>

// //                 {error && (
// //                   <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
// //                     <AlertCircle className="w-4 h-4" />
// //                     {error}
// //                   </div>
// //                 )}

// //                 <Button
// //                   type="submit"
// //                   className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
// //                   disabled={loading}
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <LoadingSpinner size="sm" className="mr-2" />
// //                       Signing In...
// //                     </>
// //                   ) : (
// //                     'Sign In as Admin'
// //                   )}
// //                 </Button>
// //               </form>

// //               <div className="bg-blue-50 p-4 rounded-lg text-sm border border-blue-200">
// //                 <div className="font-medium text-blue-800 mb-1 flex items-center gap-2">
// //                   <CheckCircle className="w-4 h-4" />
// //                   Demo Credentials:
// //                 </div>
// //                 <div className="text-blue-700">
// //                   Phone: +918000000000<br />
// //                   Password: admin123
// //                 </div>
// //               </div>
// //             </TabsContent>

// //             {/* Donor Login - Coming Soon */}
// //             <TabsContent value="donor" className="space-y-4">
// //               <div className="text-center py-8">
// //                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <Users className="w-8 h-8 text-blue-600" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                   Donor Portal
// //                 </h3>
// //                 <p className="text-gray-600 mb-6">
// //                   Enhanced donor features with gamification, impact tracking,
// //                   and personalized matching are being finalized.
// //                 </p>
// //                 <Button
// //                   onClick={() => handleComingSoon('donor')}
// //                   className="bg-blue-600 hover:bg-blue-700 text-white"
// //                 >
// //                   Join Waitlist
// //                 </Button>
// //               </div>
// //             </TabsContent>

// //             {/* Patient Login - Coming Soon */}
// //             <TabsContent value="patient" className="space-y-4">
// //               <div className="text-center py-8">
// //                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <Activity className="w-8 h-8 text-green-600" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                   Patient Portal
// //                 </h3>
// //                 <p className="text-gray-600 mb-6">
// //                   Personalized care coordination, health tracking,
// //                   and bridge management features launching soon.
// //                 </p>
// //                 <Button
// //                   onClick={() => handleComingSoon('patient')}
// //                   className="bg-green-600 hover:bg-green-700 text-white"
// //                 >
// //                   Get Early Access
// //                 </Button>
// //               </div>
// //             </TabsContent>
// //           </Tabs>

// //           {/* Footer */}
// //           <div className="text-center mt-6 pt-6 border-t border-gray-200">
// //             <p className="text-sm text-gray-500">
// //               Part of the <strong className="text-red-600">Thalassemia-Free India 2030</strong> Mission
// //             </p>
// //           </div>
// //         </Card>

// //         {/* Coming Soon Modal */}
// //         <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
// //           <DialogContent className="sm:max-w-md">
// //             <DialogHeader>
// //               <DialogTitle className="text-center">
// //                 {comingSoonType === 'donor' ? 'Donor Portal' : 'Patient Portal'} Coming Soon!
// //               </DialogTitle>
// //             </DialogHeader>
// //             <div className="text-center py-6">
// //               <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                 <Heart className="w-10 h-10 text-red-600" />
// //               </div>
// //               <h3 className="text-lg font-semibold text-gray-900 mb-4">
// //                 Phase 2 Features
// //               </h3>
// //               <p className="text-gray-600 mb-6">
// //                 We're working hard to bring you an amazing {comingSoonType} experience
// //                 with personalized features, real-time updates, and seamless care coordination.
// //               </p>
// //               <div className="bg-red-50 p-4 rounded-lg">
// //                 <p className="text-sm text-red-700">
// //                   <strong>Coming Soon:</strong> Complete {comingSoonType} portal with
// //                   advanced matching, health tracking, and community features.
// //                 </p>
// //               </div>
// //             </div>
// //           </DialogContent>
// //         </Dialog>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// import { Heart, Shield, Users, Activity, AlertCircle, CheckCircle } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { authAPI } from '../lib/api';
// import { mockDonorData, mockPatientData } from '../lib/mockData';
// import LoadingSpinner from '../components/common/LoadingSpinner';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('admin');

//   // --- State for each form ---
//   const [adminForm, setAdminForm] = useState({ phone: '+918000000000', password: 'admin123' });
//   const [donorForm, setDonorForm] = useState({ phone: '+919876543210', password: 'donor123' });
//   const [patientForm, setPatientForm] = useState({ phone: '+911234567890', password: 'patient123' });

//   const handleAdminLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       // Real API call for Admin
//       const response = await authAPI.adminLogin(adminForm);
//       const { user, token } = response.data;
//       login(user, token);
//       navigate('/admin');
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- MOCK LOGIN HANDLERS ---
//   const handleDonorLogin = (e) => {
//     e.preventDefault();
//     setError('');
//     if (donorForm.phone === mockDonorData.phone && donorForm.password === 'donor123') {
//       const mockUser = { name: mockDonorData.name, phone: mockDonorData.phone, role: 'donor' };
//       login(mockUser, 'mock-donor-jwt-token');
//       navigate('/donor');
//     } else {
//       setError('Invalid donor credentials. Please use the demo details.');
//     }
//   };

//   const handlePatientLogin = (e) => {
//     e.preventDefault();
//     setError('');
//     // Using an invented phone number for the mock patient for consistency
//     if (patientForm.phone === '+911234567890' && patientForm.password === 'patient123') {
//         const mockUser = { name: mockPatientData.name, phone: '+911234567890', role: 'patient' };
//         login(mockUser, 'mock-patient-jwt-token');
//         navigate('/patient');
//     } else {
//       setError('Invalid patient credentials. Please use the demo details.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
//             <Heart className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Access your BloodBridge AI portal</p>
//         </div>

//         <Card className="p-6 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
//           <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setError(''); }} className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-6">
//               <TabsTrigger value="admin"><Shield className="w-4 h-4 mr-1" />Admin</TabsTrigger>
//               <TabsTrigger value="donor"><Users className="w-4 h-4 mr-1" />Donor</TabsTrigger>
//               <TabsTrigger value="patient"><Activity className="w-4 h-4 mr-1" />Patient</TabsTrigger>
//             </TabsList>

//             {/* Admin Login Form */}
//             <TabsContent value="admin">
//               <form onSubmit={handleAdminLogin} className="space-y-4">
//                 {/* Form fields... */}
//                 <div className="space-y-2"><Label htmlFor="admin-phone">Phone Number</Label><Input id="admin-phone" type="tel" value={adminForm.phone} onChange={(e) => setAdminForm({...adminForm, phone: e.target.value})} required /></div>
//                 <div className="space-y-2"><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" value={adminForm.password} onChange={(e) => setAdminForm({...adminForm, password: e.target.value})} required /></div>
//                 {error && activeTab === 'admin' && (<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" />{error}</div>)}
//                 <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>{loading ? <LoadingSpinner size="sm" /> : 'Sign In as Admin'}</Button>
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200"><div className="font-medium text-blue-800 mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Demo Credentials:</div><div className="text-blue-700">Phone: +918000000000<br />Password: admin123</div></div>
//               </form>
//             </TabsContent>

//             {/* Donor Login Form */}
//             <TabsContent value="donor">
//               <form onSubmit={handleDonorLogin} className="space-y-4">
//                 <div className="space-y-2"><Label htmlFor="donor-phone">Phone Number</Label><Input id="donor-phone" type="tel" value={donorForm.phone} onChange={(e) => setDonorForm({...donorForm, phone: e.target.value})} required /></div>
//                 <div className="space-y-2"><Label htmlFor="donor-password">Password</Label><Input id="donor-password" type="password" value={donorForm.password} onChange={(e) => setDonorForm({...donorForm, password: e.target.value})} required /></div>
//                 {error && activeTab === 'donor' && (<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" />{error}</div>)}
//                 <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Sign In as Donor</Button>
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200"><div className="font-medium text-blue-800 mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Demo Credentials:</div><div className="text-blue-700">Phone: +919876543210<br />Password: donor123</div></div>
//               </form>
//             </TabsContent>

//             {/* Patient Login Form */}
//             <TabsContent value="patient">
//               <form onSubmit={handlePatientLogin} className="space-y-4">
//                 <div className="space-y-2"><Label htmlFor="patient-phone">Phone Number</Label><Input id="patient-phone" type="tel" value={patientForm.phone} onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})} required /></div>
//                 <div className="space-y-2"><Label htmlFor="patient-password">Password</Label><Input id="patient-password" type="password" value={patientForm.password} onChange={(e) => setPatientForm({...patientForm, password: e.target.value})} required /></div>
//                 {error && activeTab === 'patient' && (<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" />{error}</div>)}
//                 <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Sign In as Patient</Button>
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200"><div className="font-medium text-blue-800 mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Demo Credentials:</div><div className="text-blue-700">Phone: +911234567890<br />Password: patient123</div></div>
//               </form>
//             </TabsContent>
//           </Tabs>

//           <div className="text-center mt-6 pt-6 border-t border-gray-200">
//             <p className="text-sm text-gray-500">
//               Part of the <strong className="text-red-600">Thalassemia-Free India 2030</strong> Mission
//             </p>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Login;



// frontend/src/pages/Login.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Heart, Shield, Users, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../lib/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Get the user from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('admin');

  const [formState, setFormState] = useState({
    admin: { phone: '+918000000000', password: 'admin123' },
    donor: { phone: '+919876543210', password: 'donor123' },
    patient: { phone: '+911234567890', password: 'patient123' },
  });

  // --- EFFECT FOR REDIRECTION ---
  // This will run whenever the 'user' object in our context changes.
  useEffect(() => {
    if (user) {
      console.log("User detected, redirecting. Role:", user.role);
      // Redirect based on the role now present in the context
      if (user.role === 'Admin') navigate('/admin');
      else if (user.role === 'Donor') navigate('/donor');
      else if (user.role === 'Patient') navigate('/patient');
      else navigate('/'); // Fallback
    }
  }, [user, navigate]); // Dependencies: user and navigate

  const handleInputChange = (role, field, value) => {
    setFormState(prev => ({
      ...prev,
      [role]: { ...prev[role], [field]: value }
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const credentials = formState[activeTab];

    try {
      const response = await authAPI.login(credentials);
      const { user: userData, token } = response.data;
      
      // This now just updates the context. The useEffect will handle the redirect.
      login(userData, token); 

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
      setLoading(false); // Make sure to stop loading on error
    }
    // We no longer navigate here.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Access your BloodBridge AI portal</p>
        </div>

        <Card className="p-6 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setError(''); }} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="admin"><Shield className="w-4 h-4 mr-1" />Admin</TabsTrigger>
                    <TabsTrigger value="donor"><Users className="w-4 h-4 mr-1" />Donor</TabsTrigger>
                    <TabsTrigger value="patient"><Activity className="w-4 h-4 mr-1" />Patient</TabsTrigger>
                </TabsList>

                <form onSubmit={handleLogin} className="space-y-4">
                    <TabsContent value="admin">
                        <div className="space-y-2"><Label htmlFor="admin-phone">Phone Number</Label><Input id="admin-phone" type="tel" value={formState.admin.phone} onChange={(e) => handleInputChange('admin', 'phone', e.target.value)} required /></div>
                        <div className="space-y-2"><Label htmlFor="admin-password">Password</Label><Input id="admin-password" type="password" value={formState.admin.password} onChange={(e) => handleInputChange('admin', 'password', e.target.value)} required /></div>
                    </TabsContent>
                    <TabsContent value="donor">
                         <div className="space-y-2"><Label htmlFor="donor-phone">Phone Number</Label><Input id="donor-phone" type="tel" value={formState.donor.phone} onChange={(e) => handleInputChange('donor', 'phone', e.target.value)} required /></div>
                        <div className="space-y-2"><Label htmlFor="donor-password">Password</Label><Input id="donor-password" type="password" value={formState.donor.password} onChange={(e) => handleInputChange('donor', 'password', e.target.value)} required /></div>
                    </TabsContent>
                    <TabsContent value="patient">
                        <div className="space-y-2"><Label htmlFor="patient-phone">Phone Number</Label><Input id="patient-phone" type="tel" value={formState.patient.phone} onChange={(e) => handleInputChange('patient', 'phone', e.target.value)} required /></div>
                        <div className="space-y-2"><Label htmlFor="patient-password">Password</Label><Input id="patient-password" type="password" value={formState.patient.password} onChange={(e) => handleInputChange('patient', 'password', e.target.value)} required /></div>
                    </TabsContent>

                    {error && (<div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg"><AlertCircle className="w-4 h-4" />{error}</div>)}
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>{loading ? <LoadingSpinner size="sm" /> : `Sign In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}</Button>
                    
                    <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200">
                        <div className="font-medium text-blue-800 mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4" />Demo Credentials:</div>
                        <div className="text-blue-700">
                            <strong>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Phone:</strong> {formState[activeTab].phone}<br />
                            <strong>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Password:</strong> {formState[activeTab].password}
                        </div>
                    </div>
                </form>
            </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;