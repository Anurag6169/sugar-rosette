'use client';

import React from 'react';
import { useRouter } from 'next/router';
import Navbar from "../../components/layout/Navbar";
import { sampleProducts } from "../../data/products";
import SimilarProducts from "../../components/SimilarProducts";
import RecentlyViewed from "../../components/RecentlyViewed";
import PeopleAlsoViewed from "../../components/PeopleAlsoViewed";

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  // Find the product by slug
  const product = sampleProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
        <Navbar />
        <div className="pt-20 lg:pt-24 pb-20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-serif font-bold text-[#4A2E2A] mb-4">
              Product Not Found
            </h1>
            <p className="text-lg text-[#4A2E2A]/80 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-[#C9A14A] text-white font-semibold rounded-xl hover:bg-[#E8DFD6] hover:text-[#4A2E2A] transition-all duration-300"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />
      
      {/* Product Detail */}
      <section className="pt-20 lg:pt-24 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/')}
                  className="text-[#C9A14A] hover:text-[#4A2E2A] transition-colors"
                >
                  Home
                </button>
              </li>
              <li className="text-[#4A2E2A]/60">/</li>
              <li>
                <button 
                  onClick={() => router.push('/products')}
                  className="text-[#C9A14A] hover:text-[#4A2E2A] transition-colors"
                >
                  Products
                </button>
              </li>
              <li className="text-[#4A2E2A]/60">/</li>
              <li className="text-[#4A2E2A]">{product.title}</li>
            </ol>
          </nav>

          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Product Image */}
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.status === 'coming_soon' && (
                <div className="absolute top-4 left-4 bg-[#C9A14A]/90 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                  Coming Soon
                </div>
              )}
              {product.status === 'out_of_stock' && (
                <div className="absolute top-4 left-4 bg-[#4A2E2A]/90 text-white px-3 py-2 rounded-lg text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              
              {/* Meta */}
              {product.meta && (
                <p className="text-sm text-[#4A2E2A]/70 mb-2 font-medium">
                  {product.meta}
                </p>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < (product.rating?.value || 0) ? 'text-[#C9A14A]' : 'text-[#E8DFD6]'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-[#4A2E2A]/60 ml-2">
                    ({product.rating?.count || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              {product.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#4A2E2A]">
                    {product.price}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-lg text-[#4A2E2A]/80 mb-6 leading-relaxed">
                {product.summary}
              </p>

              {/* Badges */}
              {product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[#F7F3EE] text-[#4A2E2A] border border-[#C9A14A]/30 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium bg-[#E8DFD6] text-[#4A2E2A]/70 border border-[#4A2E2A]/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={product.status !== 'available'}
                  className={`px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    product.status === 'available'
                      ? 'bg-[#C9A14A] text-white hover:bg-[#E8DFD6] hover:text-[#4A2E2A]'
                      : 'bg-[#E8DFD6] text-[#4A2E2A]/50 cursor-not-allowed'
                  }`}
                >
                  {product.status === 'available' ? 'Enquire Now' : 'Unavailable'}
                </button>
                
                <button
                  onClick={() => router.push('/products')}
                  className="px-8 py-4 text-lg font-semibold bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300"
                >
                  Back to Products
                </button>
              </div>

              {/* Microcopy */}
              {product.microcopy && (
                <p className="text-sm text-[#4A2E2A]/60 mt-4 text-center">
                  {product.microcopy}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mt-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Product Information */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DFD6]">
                  <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">
                    Product Details
                  </h3>
                  <div className="space-y-3 text-[#4A2E2A]/80">
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span className="font-medium">Brand</span>
                      <span>{product.categoryOrBrand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span className="font-medium">Weight</span>
                      <span>265g</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span className="font-medium">Country of Origin</span>
                      <span>Belgium</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span className="font-medium">Shelf Life</span>
                      <span>12 months</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Storage</span>
                      <span>Store in cool, dry place</span>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DFD6] mt-6">
                  <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">
                    Ingredients
                  </h3>
                  <p className="text-[#4A2E2A]/80 leading-relaxed">
                    Sugar, cocoa butter, whole milk powder, cocoa mass, emulsifier (lecithin), natural vanilla flavoring. 
                    May contain traces of nuts, soy, and gluten.
                  </p>
                </div>

                {/* Nutritional Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DFD6] mt-6">
                  <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span>Energy</span>
                      <span>580 kcal</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span>Fat</span>
                      <span>38g</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span>Carbohydrates</span>
                      <span>52g</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#E8DFD6]">
                      <span>Protein</span>
                      <span>8g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E8DFD6]">
                  <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">
                    Shipping & Returns
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#C9A14A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#4A2E2A]">Free Shipping</h4>
                        <p className="text-sm text-[#4A2E2A]/70">On orders above ₹999</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#C9A14A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#4A2E2A]">Express Delivery</h4>
                        <p className="text-sm text-[#4A2E2A]/70">Same day delivery in select cities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#C9A14A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#4A2E2A]">Easy Returns</h4>
                        <p className="text-sm text-[#4A2E2A]/70">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#C9A14A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#4A2E2A]">Fresh Guarantee</h4>
                        <p className="text-sm text-[#4A2E2A]/70">Always delivered fresh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Similar Products Section */}
        <SimilarProducts 
          currentProduct={product} 
          allProducts={sampleProducts} 
        />
        
        {/* Recently Viewed Section */}
        <RecentlyViewed currentProductId={product.id} />
        
        {/* People Also Viewed Section */}
        <PeopleAlsoViewed currentProduct={product} />
    </div>
  );
}
