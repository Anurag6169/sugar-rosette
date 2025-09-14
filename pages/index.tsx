import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/Hero";
import CategoryTiles from "../components/CategoryTiles";
import FeaturedCollections from "../components/FeaturedCollections";
import OccasionsStrip from "../components/OccasionsStrip";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      {/* Main Content */}
      <main role="main">
        {/* Hero Section */}
        <Hero />
        
        {/* Category Tiles Section */}
        <CategoryTiles />
        
        {/* Occasions Strip Section */}
        <OccasionsStrip />
        
        {/* Featured Collections Section */}
        <FeaturedCollections />
        
        {/* Coming Soon Section */}
        <section className="py-20 px-4 w-full">
          <div className="max-w-6xl mx-auto text-center w-full">
            <h2 className="text-4xl font-serif font-bold text-[#4A2E2A] mb-8">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600">
              We're crafting something special for you. Stay tuned for our premium collection launch.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
