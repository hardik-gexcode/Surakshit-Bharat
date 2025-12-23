export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type VerificationStatus = 'verified' | 'pending' | 'blacklisted';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface VisitHistory {
  id: string;
  date: string;
  time: string;
  location: string;
  residentName?: string;
  purpose?: string;
}

export interface Worker {
  id: string;
  name: string;
  nameHindi?: string;
  photo: string;
  company: string;
  companyLogo?: string;
  idNumber: string;
  phone: string;
  rating: number;
  verificationStatus: VerificationStatus;
  policeVerified: boolean;
  aadhaarLinked: boolean;
  riskLevel: RiskLevel;
  employmentDuration: string;
  backgroundCheckStatus: 'completed' | 'pending' | 'failed';
  lastVerified: string;
  visitCount: number;
  visitHistory: VisitHistory[];
  qrCode?: string;
  address?: string;
  emergencyContact?: string;
}

export interface ReportIssue {
  workerId: string;
  category: string;
  description: string;
  reportedBy?: string;
  timestamp: string;
}
