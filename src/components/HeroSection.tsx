import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury collection"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30 dark:from-background/98 dark:via-background/80 dark:to-background/40" />
      </div>

      <div className="container relative py-24 md:py-36 lg:py-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6 bg-background/50 backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-accent" />
            {t("hero.secondary")}
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg font-semibold mb-8 max-w-md">
            {t("hero.subtitle")}
          </p>

          <Button
            size="lg"
            className=" flex bg-accent text-accent-foreground hover:bg-accent/90 gap-2 font-semibold"
          >
            <Link to={"/products"}>{t("hero.cta")}</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
