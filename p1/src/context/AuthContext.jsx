import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (email, password, name) => {
    // In a real app, you would call your authentication service here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { id: Date.now().toString(), email, name };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  // Login function
  const login = (email, password) => {
    // In a real app, you would call your authentication service here
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, we'll accept any credentials
        const user = { id: Date.now().toString(), email, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return Promise.resolve();
  };

  // Reset password function
  const resetPassword = (email) => {
    // In a real app, you would call your authentication service here
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Password reset email sent to ${email}`);
        resolve();
      }, 1000);
    });
  };

  // Update profile function
  const updateProfile = (name, email) => {
    // In a real app, you would call your authentication service here
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = { ...currentUser, name, email };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        resolve(updatedUser);
      }, 1000);
    });
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
