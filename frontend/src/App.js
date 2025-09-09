// import React from "react";
// import "./App.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Header from "./components/common/Header";
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import AdminPortal from "./pages/AdminPortal";
// import DonorPortal from "./pages/DonorPortal";
// import PatientPortal from "./pages/PatientPortal";
// import LoadingSpinner from "./components/common/LoadingSpinner";

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-50">
//         <div className="flex flex-col items-center gap-4">
//           <LoadingSpinner size="xl" />
//           <p className="text-lg text-gray-600">Loading BloodBridge AI...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// function AppContent() {
//   const { loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-red-50">
//         <div className="flex flex-col items-center gap-4">
//           <LoadingSpinner size="xl" />
//           <p className="text-lg text-gray-600">Initializing BloodBridge AI...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="App min-h-screen bg-gray-50">
//       <Header />
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminPortal />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/donor"
//           element={
//             <ProtectedRoute allowedRoles={['donor']}>
//               <DonorPortal />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/patient"
//           element={
//             <ProtectedRoute allowedRoles={['patient']}>
//               <PatientPortal />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

// frontend/src/App.js

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/common/Header";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminPortal from "./pages/AdminPortal";
import DonorPortal from "./pages/DonorPortal";
import PatientPortal from "./pages/PatientPortal";
import LoadingSpinner from "./components/common/LoadingSpinner";

/**
 * NEW: A Protected Layout Component
 * This component checks for authentication and role.
 * If checks pass, it renders the child route (e.g., AdminPortal).
 * If not, it redirects to the login page.
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Show a loading spinner while the app is checking for a stored user session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner size="xl" />
          <p className="text-lg text-gray-600">Verifying Session...</p>
        </div>
      </div>
    );
  }

  // If not loading and no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If there's a user but their role is not in the allowed list, redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child component (the specific dashboard)
  return <Outlet />;
};

function AppContent() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Route */}
        <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<AdminPortal />} />
        </Route>
        
        {/* Protected Donor Route */}
        <Route element={<ProtectedRoute allowedRoles={['Donor']} />}>
          <Route path="/donor" element={<DonorPortal />} />
        </Route>

        {/* Protected Patient Route */}
        <Route element={<ProtectedRoute allowedRoles={['Patient']} />}>
          <Route path="/patient" element={<PatientPortal />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;