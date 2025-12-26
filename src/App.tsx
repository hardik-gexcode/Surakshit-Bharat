import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import routes from './routes';
import { RoleAuthProvider } from '@/contexts/RoleAuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  return (
    <Router>
      <RoleAuthProvider>
        <NotificationProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </NotificationProvider>
      </RoleAuthProvider>
    </Router>
  );
};

export default App;
