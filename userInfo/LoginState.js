import React, { createContext, useState } from 'react';

// AuthContext 생성
export const AuthContext = createContext();

// AuthProvider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
