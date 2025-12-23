import { User } from '@/types/auth';

// Mock users for different roles
export const mockUsers: Record<string, User> = {
  // Delivery Person
  'delivery_rahul': {
    id: 'delivery_rahul',
    role: 'delivery',
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    workerId: 'SW001',
    company: 'Swiggy',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    status: 'verified'
  },
  'delivery_priya': {
    id: 'delivery_priya',
    role: 'delivery',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    workerId: 'ZM002',
    company: 'Zomato',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    status: 'pending'
  },
  
  // Company Admin
  'company_swiggy': {
    id: 'company_swiggy',
    role: 'company',
    name: 'Swiggy Admin',
    email: 'admin@swiggy.com',
    company: 'Swiggy',
    profilePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    status: 'verified'
  },
  'company_zomato': {
    id: 'company_zomato',
    role: 'company',
    name: 'Zomato Admin',
    email: 'admin@zomato.com',
    company: 'Zomato',
    profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    status: 'verified'
  },
  
  // Police Super Admin
  'police_mumbai': {
    id: 'police_mumbai',
    role: 'police',
    name: 'Inspector Rajesh Singh',
    policeId: 'MH01-12345',
    phone: '+91 98765 43212',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    status: 'verified'
  }
};

// Mock authentication function
export const authenticateUser = (credentials: {
  phone?: string;
  email?: string;
  password?: string;
  policeId?: string;
  otp?: string;
  role: string;
}): User | null => {
  const { phone, email, policeId, otp, password, role } = credentials;
  
  // Delivery Person Login (Phone + OTP)
  if (role === 'delivery' && phone && otp) {
    if (otp === '123456') { // Mock OTP
      if (phone === '+919876543210' || phone === '9876543210') {
        return mockUsers.delivery_rahul;
      }
      if (phone === '+919876543211' || phone === '9876543211') {
        return mockUsers.delivery_priya;
      }
    }
  }
  
  // Company Admin Login (Email + Password)
  if (role === 'company' && email && password) {
    if (email === 'admin@swiggy.com' && password === 'admin123') {
      return mockUsers.company_swiggy;
    }
    if (email === 'admin@zomato.com' && password === 'admin123') {
      return mockUsers.company_zomato;
    }
  }
  
  // Police Login (Police ID + OTP)
  if (role === 'police' && policeId && otp) {
    if (otp === '123456' && policeId === 'MH01-12345') {
      return mockUsers.police_mumbai;
    }
  }
  
  return null;
};

// Mock company stats
export const companyStats = {
  swiggy: {
    totalStaff: 2347,
    verified: 2089,
    pending: 258,
    todayVerifications: 1247,
    incidentReports: 2
  },
  zomato: {
    totalStaff: 1892,
    verified: 1654,
    pending: 238,
    todayVerifications: 987,
    incidentReports: 1
  }
};

// Mock police stats
export const policeStats = {
  highRisk: 17,
  blacklisted: 43,
  underWatch: 89,
  totalVerifications: 12456,
  todayIncidents: 3
};
