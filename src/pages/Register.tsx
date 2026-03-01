import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { useTheme } from "@/components/ThemeProvider";
import {
  Sun,
  Moon,
  Globe,
  ArrowLeft,
  Mail,
  Lock,
  UserPlus,
} from "lucide-react";
// import { api } from "@/lib/mock-data";  // no longer used, store handles registration
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const registerUser = useAuthStore((s) => s.register);
  const user = useAuthStore((s) => s.user);
  const { theme, toggle } = useTheme();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    // VALIDATION STRATEGY FIX:
    mode: "onBlur", // Validates when the user leaves an input
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError("");
    // use the auth store which already pushes into the shared users array
    const ok = registerUser(data.name, data.email, data.password);
    if (ok) {
      // after registering, the store already logged the user in
      navigate("/");
    } else {
      setError(t("user.emailInUse"));
    }
    setIsLoading(false);
  };

  const switchLang = () => {
    const next = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = next;
  };

  const InputField = ({ id, type, icon: Icon, placeholder, error }: any) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {t(`user.${id}`)}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className={cn("pl-9", error && "border-destructive")}
          {...register(id)}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-destructive flex items-center gap-1 mt-1"
        >
          <span>•</span> {error.message}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={switchLang}
            className="rounded-full"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <Card className="border-2 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="text-center space-y-4 pb-8">
            <p className="font-display text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LUXE
            </p>
            <div className="w-16 h-1 bg-accent/30 mx-auto mt-4 rounded-full" />
            <CardTitle className="text-2xl font-display">
              {t("user.register")}
            </CardTitle>
            <CardDescription>{t("user.createAccount")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <InputField
                id="name"
                type="text"
                icon={UserPlus}
                placeholder="Your name"
                error={errors.name}
              />
              <InputField
                id="email"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                error={errors.email}
              />
              <InputField
                id="password"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                error={errors.password}
              />
              <InputField
                id="confirm"
                type="password"
                icon={Lock}
                placeholder="••••••••"
                error={errors.confirm}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-accent-foreground font-medium py-5 shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mr-2"
                  >
                    <UserPlus className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <UserPlus className="h-4 w-4 mr-2" />
                )}
                {isLoading ? t("user.creating") : t("user.createAccount")}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-6 border-t">
            <p className="text-xs text-muted-foreground text-center">
              {t("user.haveAccount")}{" "}
              <a href="/login" className="text-accent">
                {t("user.login")}
              </a>
            </p>
            <p className="text-xs text-muted-foreground text-center">
              <a href="/admin/login" className="text-accent">
                {t("user.adminLogin")}
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
