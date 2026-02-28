import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Sun, Moon, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { key: 'products', path: '/admin/products', icon: Package },
  { key: 'orders', path: '/admin/orders', icon: ShoppingCart },
  { key: 'users', path: '/admin/users', icon: Users },
];

export function AdminLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggle } = useTheme();

  const switchLang = () => {
    const next = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex w-56 flex-col border-r bg-card p-4"
      >
        <div className="flex items-center gap-2 mb-8 px-2">
          <span className="font-display text-xl font-bold">LUXE</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ key, path, icon: Icon, end }) => (
            <NavLink
              key={key}
              to={path}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {t(`admin.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 pt-4 border-t">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-3" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" /> {t('nav.home')}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-3" onClick={switchLang}>
            <Globe className="h-4 w-4" /> {i18n.language === 'en' ? 'العربية' : 'English'}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-3" onClick={toggle}>
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            {t(`theme.${theme === 'light' ? 'dark' : 'light'}`)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => { logout(); navigate('/admin/login'); }}
          >
            <LogOut className="h-4 w-4" /> {t('nav.logout')}
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
