
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Settings, Apps, LockKeyhole, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/apps', icon: Apps, label: 'Apps' },
    { path: '/lock', icon: LockKeyhole, label: 'Lock' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-fortress-100 dark:border-fortress-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-fortress-600" />
            <h1 className="text-xl font-bold text-fortress-900 dark:text-fortress-100">App Lock Fortress</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      <nav className="sticky bottom-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-t border-fortress-100 dark:border-fortress-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={cn(
                  "flex flex-col items-center py-3 px-4 transition-colors",
                  isActive(item.path) 
                    ? "text-fortress-600 dark:text-fortress-400" 
                    : "text-gray-500 hover:text-fortress-500 dark:text-gray-400 dark:hover:text-fortress-300"
                )}
              >
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
