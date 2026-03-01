import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/mock-data";
import { Sparkles, ArrowRight, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCarousel() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: api.getFeaturedProducts,
  });

  const featuredProducts = data?.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="relative  mt-8">
      {/* Dynamic Background Blurs using optimized HSL */}

      <div className="container relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase text-accent">
              {t("Editor's Choice")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground"
          >
            This Week's <span className="text-gradient">Featured</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-muted-foreground text-lg leading-relaxed"
          >
            Hand-selected premium pieces that define luxury and elegance. Each
            item tells a unique story of craftsmanship.
          </motion.p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/5] bg-muted rounded-[--radius]" />
                <div className="h-6 bg-muted rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {featuredProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" },
                  },
                }}
                onClick={() => navigate(`/products/product/${product.id}`)}
                className="group relative"
              >
                {/* Product Card */}
                <div className="relative bg-card border border-border/60 rounded-[--radius] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                  {/* Image & Badges */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Ranking Tag */}
                    <div className="absolute top-4 left-4">
                      <div className="glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter text-foreground">
                        #{index + 1} Best Seller
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4 glass px-2 py-1 rounded-lg flex items-center gap-1">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span className="text-xs font-bold">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 text-center">
                    <h3 className="font-display text-2xl font-bold mb-3 transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-6 px-2">
                      {product.description}
                    </p>

                    <div className="pt-4 border-t border-border/50 flex flex-col items-center gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                        Starting from
                      </span>
                      <span className="text-3xl font-display font-bold text-primary">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Giant Number (Background) */}
                <span className="absolute -top-10 -right-4 text-[120px] font-display font-black text-primary/[0.03] select-none pointer-events-none group-hover:text-accent/10 transition-colors">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20"
        >
          <Button
            variant="link"
            onClick={() => navigate("/products")}
            className="group font-sans font-bold text-lg "
          >
            Explore Full Collection
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2 text-accent" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
