import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  LogOut, 
  Settings, 
  Moon, 
  Sun, 
  BarChart2,
  Home,
  User as UserIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface LayoutProps {
  children: React.ReactNode;
  profilePhoto?: string;
}

export function Layout({ children, profilePhoto }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <header className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-4`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vyfmmtw8LDNzjBCI1aZAON60w8P8i9_Zbg&s" 
              alt="Souhoola Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold">
              <span style={{ color: '#35de75', backgroundColor: '#6d21c8', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                Souhoola
              </span>{' '}
              Sales Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {format(currentTime, 'PPpp')}
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-full relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800"
              >
                <img
                  src={profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>salesadmin</span>
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 top-12 w-48 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    onClick={toggleTheme}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center gap-2 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <nav className={`w-64 h-[calc(100vh-73px)] ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 fixed`}>
          <div className="space-y-2">
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive('/dashboard')
                  ? 'bg-[#35de75] text-[#6d21c8]'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive('/analytics')
                  ? 'bg-[#35de75] text-[#6d21c8]'
                  : 'hover:bg-gray-800'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              Sales Analytics
            </Link>
            <Link
              to="/settings"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive('/settings')
                  ? 'bg-[#35de75] text-[#6d21c8]'
                  : 'hover:bg-gray-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </div>
        </nav>
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}