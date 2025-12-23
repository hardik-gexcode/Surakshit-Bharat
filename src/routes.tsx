import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';
import QRScannerScreen from './pages/QRScannerScreen';
import VerificationResultScreen from './pages/VerificationResultScreen';
import WorkerProfileScreen from './pages/WorkerProfileScreen';
import SearchResultsScreen from './pages/SearchResultsScreen';
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
  }
];

export default routes;
