import SplashScreen from './pages/SplashScreen';
import RoleSelectionScreen from './pages/RoleSelectionScreen';
import HomeScreen from './pages/HomeScreen';
import QRScannerScreen from './pages/QRScannerScreen';
import VerificationResultScreen from './pages/VerificationResultScreen';
import WorkerProfileScreen from './pages/WorkerProfileScreen';
import SearchResultsScreen from './pages/SearchResultsScreen';
import FaceVerificationScreen from './pages/FaceVerificationScreen';
import DeliveryLoginScreen from './pages/DeliveryLoginScreen';
import DeliveryRegistrationScreen from './pages/DeliveryRegistrationScreen';
import DeliveryDashboardScreen from './pages/DeliveryDashboardScreen';
import DeliveryQRScreen from './pages/DeliveryQRScreen';
import CompanyLoginScreen from './pages/CompanyLoginScreen';
import CompanyDashboardScreen from './pages/CompanyDashboardScreen';
import CompanyStaffListScreen from './pages/CompanyStaffListScreen';
import PoliceLoginScreen from './pages/PoliceLoginScreen';
import PoliceDashboardScreen from './pages/PoliceDashboardScreen';
import PoliceSearchScreen from './pages/PoliceSearchScreen';
import PolicePersonDetailScreen from './pages/PolicePersonDetailScreen';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Splash',
    path: '/',
    element: <SplashScreen />,
    visible: false
  },
  {
    name: 'Role Selection',
    path: '/role-selection',
    element: <RoleSelectionScreen />,
    visible: false
  },
  // Resident Routes
  {
    name: 'Home',
    path: '/home',
    element: <HomeScreen />,
    visible: false
  },
  {
    name: 'QR Scanner',
    path: '/scanner',
    element: <QRScannerScreen />,
    visible: false
  },
  {
    name: 'Verification Result',
    path: '/verify/:id',
    element: <VerificationResultScreen />,
    visible: false
  },
  {
    name: 'Worker Profile',
    path: '/profile/:id',
    element: <WorkerProfileScreen />,
    visible: false
  },
  {
    name: 'Search Results',
    path: '/search',
    element: <SearchResultsScreen />,
    visible: false
  },
  {
    name: 'Face Verification',
    path: '/face-verify/:id',
    element: <FaceVerificationScreen />,
    visible: false
  },
  // Delivery Person Routes
  {
    name: 'Delivery Login',
    path: '/delivery/login',
    element: <DeliveryLoginScreen />,
    visible: false
  },
  {
    name: 'Delivery Registration',
    path: '/delivery/register',
    element: <DeliveryRegistrationScreen />,
    visible: false
  },
  {
    name: 'Delivery Dashboard',
    path: '/delivery/dashboard',
    element: <DeliveryDashboardScreen />,
    visible: false
  },
  {
    name: 'Delivery QR',
    path: '/delivery/qr',
    element: <DeliveryQRScreen />,
    visible: false
  },
  {
    name: 'Delivery Profile',
    path: '/delivery/profile',
    element: <WorkerProfileScreen />,
    visible: false
  },
  {
    name: 'Delivery History',
    path: '/delivery/history',
    element: <SearchResultsScreen />,
    visible: false
  },
  {
    name: 'Delivery Documents',
    path: '/delivery/documents',
    element: <SearchResultsScreen />,
    visible: false
  },
  // Company Admin Routes
  {
    name: 'Company Login',
    path: '/company/login',
    element: <CompanyLoginScreen />,
    visible: false
  },
  {
    name: 'Company Dashboard',
    path: '/company/dashboard',
    element: <CompanyDashboardScreen />,
    visible: false
  },
  {
    name: 'Company Staff',
    path: '/company/staff',
    element: <CompanyStaffListScreen />,
    visible: false
  },
  {
    name: 'Company Bulk Upload',
    path: '/company/bulk-upload',
    element: <SearchResultsScreen />,
    visible: false
  },
  // Police Admin Routes
  {
    name: 'Police Login',
    path: '/police/login',
    element: <PoliceLoginScreen />,
    visible: false
  },
  {
    name: 'Police Dashboard',
    path: '/police/dashboard',
    element: <PoliceDashboardScreen />,
    visible: false
  },
  {
    name: 'Police Search',
    path: '/police/search',
    element: <PoliceSearchScreen />,
    visible: false
  },
  {
    name: 'Police Person Detail',
    path: '/police/person/:id',
    element: <PolicePersonDetailScreen />,
    visible: false
  }
];

export default routes;
