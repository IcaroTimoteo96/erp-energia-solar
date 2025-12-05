
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Quotes from './pages/Quotes';
import Projects from './pages/Projects';
import ServiceOrders from './pages/ServiceOrders';
import Inventory from './pages/Inventory';
import Support from './pages/Support';
import Financial from './pages/Financial';
import Performance from './pages/Performance';
import Analytics from './pages/Analytics';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="quotes" element={<Quotes />} />
              <Route path="projects" element={<Projects />} />
              <Route path="/service-orders" element={<ServiceOrders />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/support" element={<Support />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
