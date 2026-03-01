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
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useTranslation } from "react-i18next";
import { products } from "@/lib/mock-data";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(id || ""));

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t("common.notFound")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("common.notFoundDesc")}
            </p>
            <Button onClick={() => navigate("/products")}>
              {t("products.back")}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const displayName =
    i18n.language === "ar"
      ? (product as any).name_ar || product.name
      : (product as any).name_en || product.name;

  const displayDescription =
    i18n.language === "ar"
      ? (product as any).description_ar || product.description
      : (product as any).description_en || product.description;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = () => {
    const willBeWishlisted = !isWishlisted;
    toggleWishlist(product);
    toast({
      title: willBeWishlisted
        ? t("products.addToWishlist")
        : t("products.removeFromWishlist"),
    });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back */}
        <div className="border-b bg-muted/40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("products.back")}
            </button>
          </div>
        </div>

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {t(`categories.${product.category}`)}
              </p>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {displayName}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
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
                  {product.rating} {t("products.reviews")}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {displayDescription}
              </p>

              {/* Price */}
              <div className="text-3xl font-bold mb-4">
                ${product.price.toLocaleString()}
              </div>

              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600 font-medium">
                    {product.stock} {t("products.inStock")}
                  </span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">
                    {t("products.outOfStock")}
                  </span>
                )}
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium block mb-2">
                    {t("products.quantity")}
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      min={1}
                      max={product.stock}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={product.stock === 0}
                  variant={added ? "outline" : "default"}
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      {t("products.added")}
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      {t("products.addToCart")}
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className={
                    isWishlisted ? "border-destructive text-destructive" : ""
                  }
                >
                  <Heart className="h-5 w-5 mr-2" />
                  {isWishlisted
                    ? t("products.removeFromWishlist")
                    : t("products.addToWishlist")}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 border-t pt-6">
                {[
                  [Truck, "freeShipping"],
                  [Shield, "guaranteedSafe"],
                  [RotateCcw, "easyReturns"],
                  [ShoppingBag, "qualityAssured"],
                ].map(([Icon, key]: any) => (
                  <div key={key} className="flex gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {t(`products.features.${key}`)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(`products.features.${key}Desc`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg aspect-square rounded-xl overflow-hidden bg-muted shadow-sm">
                <img
                  src={product.image}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Related */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 border-t pt-12">
              <h2 className="text-2xl font-bold mb-8">
                {t("products.relatedProducts")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="cursor-pointer rounded-xl border bg-card overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="aspect-square bg-muted">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs uppercase text-muted-foreground mb-1">
                        {t(`categories.${p.category}`)}
                      </p>
                      <h3 className="text-sm font-medium truncate mb-1">
                        {i18n.language === "ar"
                          ? (p as any).name_ar || p.name
                          : (p as any).name_en || p.name}
                      </h3>
                      <span className="font-semibold">
                        ${p.price.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
