import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Sun,
  Moon,
  Menu,
  Globe,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function Header() {
  const { t, i18n } = useTranslation();
  const { theme, toggle } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const switchLang = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="font-display text-2xl font-bold tracking-tighter text-primary"
        >
          LUXE
        </Link>

        {/* CENTER NAV - CLEANER */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.shop")}
          </Link>
          <Link
            to="/admin/login"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.admin")}
          </Link>
        </nav>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2">
          {/* UTILITY BUTTONS */}
          <div className="flex items-center mr-2 border-r pr-2 gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={switchLang}
              className="h-9 w-9"
            >
              <Globe className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className="h-9 w-9"
            >
              {theme === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>

          {/* CART */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>

          {/* AUTHENTICATION SECTION */}
          <div className="hidden md:flex">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full px-4"
                  >
                    <User className="h-4 w-4" />
                    <span>{user?.name?.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("nav.my_account")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />{" "}
                        {t("nav.admin")}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:bg-destructive/10 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">{t("nav.login")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">{t("nav.register")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 mt-12">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-semibold"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-semibold"
                >
                  {t("nav.shop")}
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-semibold"
                >
                  {t("nav.admin")}
                </Link>
                <hr />
                {isAuthenticated ? (
                  <>
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="text-xl font-semibold text-primary"
                      >
                        {t("nav.admin")}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="text-xl font-semibold text-left text-destructive"
                    >
                      {t("nav.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-xl font-semibold"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="text-xl font-semibold"
                    >
                      {t("nav.register")}
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
