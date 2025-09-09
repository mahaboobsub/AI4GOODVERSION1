// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // Check for existing auth on mount
//     const storedToken = localStorage.getItem('bloodbridge_token');
//     const storedUser = localStorage.getItem('bloodbridge_user');

//     if (storedToken && storedUser) {
//       try {
//         const userData = JSON.parse(storedUser);
//         setToken(storedToken);
//         setUser(userData);
//       } catch (error) {
//         console.error('Error parsing stored user data:', error);
//         localStorage.removeItem('bloodbridge_token');
//         localStorage.removeItem('bloodbridge_user');
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   const login = (userData, authToken) => {
//     setUser(userData);
//     setToken(authToken);
//     localStorage.setItem('bloodbridge_token', authToken);
//     localStorage.setItem('bloodbridge_user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('bloodbridge_token');
//     localStorage.removeItem('bloodbridge_user');
//   };

//   const value = {
//     user,
//     token,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// frontend/src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('bloodbridge_token');
    const storedUser = localStorage.getItem('bloodbridge_user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('bloodbridge_token');
        localStorage.removeItem('bloodbridge_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    // Ensure the user object has the role
    const userWithRole = { ...userData, role: userData.role || 'guest' };
    setUser(userWithRole);
    setToken(authToken);
    localStorage.setItem('bloodbridge_token', authToken);
    localStorage.setItem('bloodbridge_user', JSON.stringify(userWithRole));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bloodbridge_token');
    localStorage.removeItem('bloodbridge_user');
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};