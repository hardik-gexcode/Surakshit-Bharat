export type UserRole = 'resident' | 'delivery' | 'company' | 'police';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  phone?: string;
  email?: string;
  policeId?: string;
  company?: string;
  workerId?: string;
  profilePhoto?: string;
  status?: 'verified' | 'pending' | 'rejected';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;
}

export interface LoginCredentials {
  phone?: string;
  email?: string;
  password?: string;
  policeId?: string;
  otp?: string;
}
