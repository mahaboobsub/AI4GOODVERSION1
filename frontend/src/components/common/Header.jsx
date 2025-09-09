// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Button } from '../ui/button';
// import { Heart, LogOut, User, Shield, Users, Activity } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getNavigation = () => {
//     if (!user) {
//       return (
//         <div className="flex items-center gap-4">
//           <Link to="/login">
//             <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
//               Login
//             </Button>
//           </Link>
//         </div>
//       );
//     }

//     const commonNav = (
//       <div className="flex items-center gap-4">
//         <div className="flex items-center gap-2 text-gray-700">
//           <User className="w-4 h-4" />
//           <span className="font-medium">{user.name || user.phone}</span>
//           <span className="text-sm text-gray-500 capitalize flex items-center gap-1">
//             {user.role === 'admin' && <Shield className="w-3 h-3" />}
//             {user.role === 'donor' && <Users className="w-3 h-3" />}
//             {user.role === 'patient' && <Activity className="w-3 h-3" />}
//             ({user.role})
//           </span>
//         </div>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={handleLogout}
//           className="border-gray-300 text-gray-600 hover:bg-gray-50"
//         >
//           <LogOut className="w-4 h-4 mr-2" />
//           Logout
//         </Button>
//       </div>
//     );

//     return commonNav;
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 group">
//             <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
//               <Heart className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <div className="font-bold text-lg text-gray-900">BloodBridge</div>
//               <div className="text-xs text-red-600 font-medium">AI</div>
//             </div>
//           </Link>

//           {/* Navigation based on user role */}
//           {user && (
//             <nav className="hidden md:flex items-center gap-6">
//               <Link
//                 to="/"
//                 className={`text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === '/'
//                     ? 'text-red-600'
//                     : 'text-gray-600 hover:text-red-600'
//                 }`}
//               >
//                 Home
//               </Link>

//               {user.role === 'admin' && (
//                 <Link
//                   to="/admin"
//                   className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
//                     location.pathname.startsWith('/admin')
//                       ? 'text-red-600'
//                       : 'text-gray-600 hover:text-red-600'
//                   }`}
//                 >
//                   <Shield className="w-4 h-4" />
//                   Admin Portal
//                 </Link>
//               )}

//               {user.role === 'donor' && (
//                 <Link
//                   to="/donor"
//                   className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
//                     location.pathname.startsWith('/donor')
//                       ? 'text-red-600'
//                       : 'text-gray-600 hover:text-red-600'
//                   }`}
//                 >
//                   <Users className="w-4 h-4" />
//                   Donor Portal
//                 </Link>
//               )}

//               {user.role === 'patient' && (
//                 <Link
//                   to="/patient"
//                   className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
//                     location.pathname.startsWith('/patient')
//                       ? 'text-red-600'
//                       : 'text-gray-600 hover:text-red-600'
//                   }`}
//                 >
//                   <Activity className="w-4 h-4" />
//                   Patient Portal
//                 </Link>
//               )}
//             </nav>
//           )}

//           {/* User Actions */}
//           {getNavigation()}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


// frontend/src/components/common/Header.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Heart, LogOut, User, Shield, Users, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavigation = () => {
    if (!user) {
      return (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Login
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4" />
          <span className="font-medium">{user.name || user.phone}</span>
          <span className="text-sm text-gray-500 capitalize flex items-center gap-1">
            ({user.role})
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-700 transition-colors">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">BloodBridge</div>
              <div className="text-xs text-red-600 font-medium">AI</div>
            </div>
          </Link>

          {/* Navigation Links shown only when logged in */}
          {user && (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm font-medium transition-colors duration-200 ${ location.pathname === '/' ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}>
                Home
              </Link>
              {/* CORRECTED: Conditionally render the correct dashboard link based on role */}
              {user.role === 'Admin' && (
                <Link to="/admin" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${ location.pathname.startsWith('/admin') ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}>
                  <Shield className="w-4 h-4" /> Admin Portal
                </Link>
              )}
              {user.role === 'Donor' && (
                <Link to="/donor" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${ location.pathname.startsWith('/donor') ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}>
                  <Users className="w-4 h-4" /> Donor Portal
                </Link>
              )}
              {user.role === 'Patient' && (
                <Link to="/patient" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${ location.pathname.startsWith('/patient') ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}>
                  <Activity className="w-4 h-4" /> Patient Portal
                </Link>
              )}
            </nav>
          )}

          {/* User Actions (Login/Logout) */}
          {getNavigation()}
        </div>
      </div>
    </header>
  );
};

export default Header;