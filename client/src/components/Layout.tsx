import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Briefcase, Wrench, Package, LifeBuoy, DollarSign, Activity, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/leads', label: 'Leads', icon: <Users size={20} /> },
    { path: '/quotes', label: 'Quotes', icon: <FileText size={20} /> },
    { path: '/projects', label: 'Projects', icon: <Briefcase size={20} /> },
    { path: '/service-orders', label: 'Service Orders', icon: <Wrench size={20} /> },
    { path: '/inventory', label: 'Inventory', icon: <Package size={20} /> },
    { path: '/support', label: 'Support', icon: <LifeBuoy size={20} /> },
    { path: '/financial', label: 'Financeiro', icon: <DollarSign size={20} /> },
    { path: '/performance', label: 'Performance', icon: <Activity size={20} /> },
    { path: '/analytics', label: 'Análises', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
            <span>☀️</span> SolarCRM
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500 text-center">
          &copy; 2025 SolarCRM
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find((i) => i.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2 hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
