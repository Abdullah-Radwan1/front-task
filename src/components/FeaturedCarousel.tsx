import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { api } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';
import { SkeletonCard } from '@/components/SkeletonCard';

export function FeaturedCarousel() {
  const { data, isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: api.getFeaturedProducts,
  });

  return (
    <section className="container py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-2xl font-bold mb-6"
      >
        Featured
      </motion.h2>

      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[280px] snap-start">
                <SkeletonCard />
              </div>
            ))
          : data?.map((product, i) => (
              <div key={product.id} className="min-w-[280px] snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
      </div>
    </section>
  );
}
