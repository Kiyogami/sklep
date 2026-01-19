import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Shield, 
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/orders', label: 'Zamówienia', icon: ShoppingBag },
  { path: '/admin/products', label: 'Produkty', icon: Package },
  { path: '/admin/verifications', label: 'Weryfikacje', icon: Shield },
  { path: '/admin/settings', label: 'Ustawienia', icon: Settings },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
            <span className="font-display font-bold text-sm text-primary-foreground">PB</span>
          </div>
          <span className="font-display text-lg font-semibold text-gold-gradient">Admin</span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        ${collapsed ? 'w-20' : 'w-64'}
        bg-card border-r border-border
        transition-all duration-300 ease-in-out
        transform ${collapsed && 'lg:translate-x-0 -translate-x-full lg:w-20'}
        lg:translate-x-0
        flex flex-col
        pt-16 lg:pt-0
      `}>
        {/* Logo */}
        <div className={`hidden lg:flex items-center ${collapsed ? 'justify-center' : 'justify-between'} h-16 px-4 border-b border-border`}>
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-lg text-primary-foreground">PB</span>
            </div>
            {!collapsed && (
              <span className="font-display text-xl font-semibold text-gold-gradient">Admin</span>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-colors duration-200
                      ${active 
                        ? 'bg-primary/15 text-primary border-l-2 border-primary' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-medium text-primary">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'admin@prascy.pl'}
                </p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 ${collapsed ? 'px-0 justify-center' : ''}`}
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {!collapsed && 'Wyloguj'}
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {!collapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
