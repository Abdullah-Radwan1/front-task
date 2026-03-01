import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Star,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/stores/cart-store";
import { useTranslation } from "react-i18next";
import { products } from "@/lib/mock-data";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Find the product by ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t("common.notFound")}</h1>
            <p className="text-muted-foreground mb-6">Product not found</p>
            <Button onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displayName = i18n.language === "ar" ? product.nameAr : product.name;
  const displayDescription =
    i18n.language === "ar" ? product.descriptionAr : product.description;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("products.back")}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
                  {t(`categories.${product.category}`)}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {displayName}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({t("products.reviews")})
                  </span>
                </div>

                <p className="text-lg text-muted-foreground mb-6">
                  {displayDescription}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  ${product.price.toLocaleString()}
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6 p-3 rounded-lg bg-muted/60">
                <p className="text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      {product.stock} {t("products.inStock")}
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {t("products.outOfStock")}
                    </span>
                  )}
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">
                    {t("products.quantity")}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 rounded-md border border-input hover:bg-muted transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-12 h-10 rounded-md border border-input text-center"
                      min="1"
                      max={product.stock}
                    />
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="h-10 w-10 rounded-md border border-input hover:bg-muted transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full mb-4 h-12 text-base"
                variant={added ? "outline" : "default"}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    {t("products.added")}
                  </>
                ) : product.stock === 0 ? (
                  t("products.outOfStock")
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {t("products.addToCart")}
                  </>
                )}
              </Button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">
                      {t("products.features.freeShipping")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("products.features.freeShippingDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">
                      {t("products.features.guaranteedSafe")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("products.features.guaranteedSafeDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">
                      {t("products.features.easyReturns")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("products.features.easyReturnsDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShoppingBag className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">
                      {t("products.features.qualityAssured")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("products.features.qualityAssuredDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-12 border-t">
              <h2 className="text-2xl font-bold mb-8">
                {t("products.relatedProducts")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/products/${p.id}`)}
                    className="cursor-pointer rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={p.image}
                        alt={i18n.language === "ar" ? p.nameAr : p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {t(`categories.${p.category}`)}
                      </p>
                      <h3 className="font-medium text-sm mb-1 truncate">
                        {i18n.language === "ar" ? p.nameAr : p.name}
                      </h3>
                      <span className="font-display text-lg font-semibold text-foreground">
                        ${p.price.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
