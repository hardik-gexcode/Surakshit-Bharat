import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';
import { authenticateUser } from '@/data/mockAuth';

interface AuthContextType extends AuthState {
  login: (credentials: {
    phone?: string;
    email?: string;
    password?: string;
    policeId?: string;
    otp?: string;
    role: string;
  }) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function RoleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('surakshit_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: {
    phone?: string;
    email?: string;
    password?: string;
    policeId?: string;
    otp?: string;
    role: string;
  }): Promise<boolean> => {
    const authenticatedUser = authenticateUser(credentials);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setRole(authenticatedUser.role);
      setIsAuthenticated(true);
      localStorage.setItem('surakshit_user', JSON.stringify(authenticatedUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('surakshit_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useRoleAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useRoleAuth must be used within a RoleAuthProvider');
  }
  return context;
}
