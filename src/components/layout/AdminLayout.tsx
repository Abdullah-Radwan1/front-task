import { useState } from "react"; // Added useState
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Sun,
  Moon,
  Globe,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { key: "products", path: "/admin/products", icon: Package },
  { key: "orders", path: "/admin/orders", icon: ShoppingCart },
  { key: "users", path: "/admin/users", icon: Users },
];

export function AdminLayout() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggle } = useTheme();

  // 1. State to track if mobile sidebar is open
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const switchLang = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* 2. Mobile Top Bar (Only visible on small screens) */}
      <div className="flex items-center justify-between p-4 border-b bg-card md:hidden">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold">LUXE</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* 3. Mobile Backdrop/Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 4. Sidebar (Updated for Responsive behavior) */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card p-4 border-r flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:w-56 md:flex",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">LUXE</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          {/* Close button inside sidebar for mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={closeMobileMenu}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ key, path, icon: Icon, end }) => (
            <NavLink
              key={key}
              to={path}
              end={end}
              onClick={closeMobileMenu} // Auto-close menu when link is clicked
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {t(`admin.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 pt-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={switchLang}
          >
            <Globe className="h-4 w-4" />{" "}
            {i18n.language === "en" ? "العربية" : "English"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3"
            onClick={toggle}
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            {t(`theme.${theme === "light" ? "dark" : "light"}`)}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full border-t justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
          >
            <LogOut className="h-4 w-4" /> {t("nav.logout")}
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
