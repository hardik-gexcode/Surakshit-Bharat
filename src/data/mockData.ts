import type { Worker } from '@/types';

export const mockWorkers: Worker[] = [
  {
    id: 'SW001',
    name: 'Rahul Kumar',
    nameHindi: 'राहुल कुमार',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    company: 'Swiggy',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/200px-Swiggy_logo.svg.png',
    idNumber: 'SW001',
    phone: '+91 98765 43210',
    rating: 4.8,
    verificationStatus: 'verified',
    policeVerified: true,
    aadhaarLinked: true,
    riskLevel: 'low',
    employmentDuration: '2 years 3 months',
    backgroundCheckStatus: 'completed',
    lastVerified: '2 hours ago',
    visitCount: 247,
    address: 'Sector 15, Noida, Uttar Pradesh',
    emergencyContact: '+91 98765 43211',
    visitHistory: [
      {
        id: 'v1',
        date: '2025-12-23',
        time: '10:30 AM',
        location: 'Tower A, Flat 501',
        residentName: 'Priya Sharma',
        purpose: 'Food Delivery'
      },
      {
        id: 'v2',
        date: '2025-12-23',
        time: '09:15 AM',
        location: 'Tower B, Flat 302',
        residentName: 'Amit Patel',
        purpose: 'Food Delivery'
      },
      {
        id: 'v3',
        date: '2025-12-22',
        time: '08:45 PM',
        location: 'Tower C, Flat 701',
        residentName: 'Neha Singh',
        purpose: 'Food Delivery'
      },
      {
        id: 'v4',
        date: '2025-12-22',
        time: '07:20 PM',
        location: 'Tower A, Flat 404',
        residentName: 'Rajesh Kumar',
        purpose: 'Food Delivery'
      }
    ]
  },
  {
    id: 'ZM002',
    name: 'Priya Sharma',
    nameHindi: 'प्रिया शर्मा',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    company: 'Zomato',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/200px-Zomato_logo.png',
    idNumber: 'ZM002',
    phone: '+91 98765 43220',
    rating: 4.9,
    verificationStatus: 'verified',
    policeVerified: true,
    aadhaarLinked: true,
    riskLevel: 'low',
    employmentDuration: '1 year 8 months',
    backgroundCheckStatus: 'completed',
    lastVerified: '1 hour ago',
    visitCount: 189,
    address: 'Dwarka, New Delhi',
    emergencyContact: '+91 98765 43221',
    visitHistory: [
      {
        id: 'v5',
        date: '2025-12-23',
        time: '11:45 AM',
        location: 'Tower D, Flat 203',
        residentName: 'Vikram Malhotra',
        purpose: 'Food Delivery'
      },
      {
        id: 'v6',
        date: '2025-12-23',
        time: '10:00 AM',
        location: 'Tower A, Flat 601',
        residentName: 'Anjali Verma',
        purpose: 'Food Delivery'
      },
      {
        id: 'v7',
        date: '2025-12-22',
        time: '09:30 PM',
        location: 'Tower B, Flat 505',
        residentName: 'Suresh Reddy',
        purpose: 'Food Delivery'
      }
    ]
  },
  {
    id: 'AE003',
    name: 'Rajesh Yadav',
    nameHindi: 'राजेश यादव',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    company: 'AePS Banking Agent',
    idNumber: 'AE003',
    phone: '+91 98765 43230',
    rating: 4.6,
    verificationStatus: 'verified',
    policeVerified: true,
    aadhaarLinked: true,
    riskLevel: 'low',
    employmentDuration: '3 years 5 months',
    backgroundCheckStatus: 'completed',
    lastVerified: '3 hours ago',
    visitCount: 412,
    address: 'Gurgaon, Haryana',
    emergencyContact: '+91 98765 43231',
    visitHistory: [
      {
        id: 'v8',
        date: '2025-12-23',
        time: '02:15 PM',
        location: 'Tower C, Flat 801',
        residentName: 'Meera Kapoor',
        purpose: 'Banking Service'
      },
      {
        id: 'v9',
        date: '2025-12-23',
        time: '11:30 AM',
        location: 'Tower A, Flat 303',
        residentName: 'Ramesh Gupta',
        purpose: 'Banking Service'
      },
      {
        id: 'v10',
        date: '2025-12-22',
        time: '04:45 PM',
        location: 'Tower D, Flat 102',
        residentName: 'Kavita Joshi',
        purpose: 'Banking Service'
      },
      {
        id: 'v11',
        date: '2025-12-22',
        time: '02:00 PM',
        location: 'Tower B, Flat 604',
        residentName: 'Anil Sharma',
        purpose: 'Banking Service'
      },
      {
        id: 'v12',
        date: '2025-12-21',
        time: '03:30 PM',
        location: 'Tower C, Flat 405',
        residentName: 'Sunita Rao',
        purpose: 'Banking Service'
      }
    ]
  }
];

// Helper function to find worker by ID
export const findWorkerById = (id: string): Worker | undefined => {
  return mockWorkers.find(worker => worker.idNumber.toLowerCase() === id.toLowerCase());
};

// Helper function to search workers by name
export const searchWorkersByName = (name: string): Worker[] => {
  const searchTerm = name.toLowerCase();
  return mockWorkers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm) ||
    worker.nameHindi?.includes(searchTerm)
  );
};

// Helper function to get all workers
export const getAllWorkers = (): Worker[] => {
  return mockWorkers;
};
