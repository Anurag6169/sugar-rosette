'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import FilterBar from '../../components/FilterBar';
import ProductGrid from '../../components/ProductGrid';
import { getCollectionBySlug, filterGroups, Collection, Product } from '../../data/collections';

export default function CollectionPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [collection, setCollection] = useState<Collection | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      const foundCollection = getCollectionBySlug(slug);
      setCollection(foundCollection || null);
      
      if (foundCollection) {
        // Apply filters based on URL query params
        applyFilters(foundCollection.products, router.query);
      }
      
      setLoading(false);
    }
  }, [slug, router.query]);

  const applyFilters = (products: Product[], query: any) => {
    let filtered = [...products];

    // Apply type filter
    if (query.type && query.type !== 'all') {
      filtered = filtered.filter(product => 
        product.categoryOrBrand.toLowerCase() === query.type.toLowerCase()
      );
    }

    // Apply flavor filter (mock logic - in real app, this would be based on product tags/metadata)
    if (query.flavor && query.flavor !== 'all') {
      filtered = filtered.filter(product => {
        const name = product.name.toLowerCase();
        switch (query.flavor) {
          case 'dark':
            return name.includes('dark') || name.includes('70%') || name.includes('excellence');
          case 'milk':
            return name.includes('milk') || name.includes('dairy');
          case 'white':
            return name.includes('white');
          case 'caramel':
            return name.includes('caramel');
          case 'mint':
            return name.includes('mint');
          default:
            return true;
        }
      });
    }

    // Apply occasion filter (mock logic)
    if (query.occasion && query.occasion !== 'all') {
      // For demo purposes, we'll filter based on price ranges
      switch (query.occasion) {
        case 'birthday':
          filtered = filtered.filter(product => product.currentPrice >= 299 && product.currentPrice <= 1299);
          break;
        case 'anniversary':
          filtered = filtered.filter(product => product.currentPrice >= 699 && product.currentPrice <= 2999);
          break;
        case 'festive':
          filtered = filtered.filter(product => product.currentPrice >= 399 && product.currentPrice <= 4999);
          break;
        case 'corporate':
          filtered = filtered.filter(product => product.currentPrice >= 1999);
          break;
        case 'weddings':
          filtered = filtered.filter(product => product.currentPrice >= 1299);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
        <Navbar />
        <div className="pt-20 lg:pt-24">
          <ProductGrid loading={true} />
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
        <Navbar />
        <div className="pt-20 lg:pt-24">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <h1 className="text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
              Collection Not Found
            </h1>
            <p className="text-xl text-[#4A2E2A]/70 mb-8">
              The collection you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center px-6 py-3 bg-[#C9A14A] text-white font-semibold rounded-xl hover:bg-[#E8DFD6] hover:text-[#4A2E2A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{collection.name} - Sugar Rosette</title>
        <meta name="description" content={collection.description} />
      </Head>
      
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
        <Navbar />
        
        {/* Collection Header */}
        <section className="pt-20 lg:pt-24 pb-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#4A2E2A] mb-4">
                {collection.name}
              </h1>
              <p className="text-lg sm:text-xl text-[#4A2E2A]/80 max-w-3xl mx-auto leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar filters={filterGroups} />

        {/* Products Grid */}
        <section className="py-8">
          <ProductGrid products={filteredProducts} />
        </section>
      </div>
    </>
  );
}
