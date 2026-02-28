import { motion } from 'framer-motion';
import { ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/lib/mock-data';
import { useState } from 'react';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { t } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group rounded-lg border bg-card overflow-hidden"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {t(`categories.${product.category}`)}
        </p>
        <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-foreground">${product.price.toLocaleString()}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            variant={added ? 'outline' : 'default'}
            className={added ? 'bg-success/10 text-success border-success/30' : 'bg-accent text-accent-foreground hover:bg-accent/90'}
          >
            {added ? (
              <><Check className="h-3.5 w-3.5 mr-1" />{t('products.added')}</>
            ) : (
              <><ShoppingBag className="h-3.5 w-3.5 mr-1" />{t('products.addToCart')}</>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
