import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCarousel />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
