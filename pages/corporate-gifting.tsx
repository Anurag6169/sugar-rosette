'use client';

import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirements: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  requirements?: string;
}

export default function CorporateGifting() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter products for corporate hampers
  const corporateHampers = sampleProducts.filter(product => 
    product.categoryOrBrand === 'Luxury' || 
    product.categoryOrBrand === 'Corporate' ||
    product.currentPrice >= 1000
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Please describe your requirements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      requirements: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7F3EE] via-white to-[#E8DFD6]">
      <Navbar />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg animate-slideIn">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Thank you! We'll contact you within 24 hours.</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4A2E2A] mb-6">
              Corporate Gifting
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 text-[#C9A14A]">
                Excellence Delivered
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#4A2E2A]/80 max-w-4xl mx-auto leading-relaxed mb-8">
              Elevate your business relationships with our premium corporate gifting solutions. 
              From luxury hampers to custom confections, we deliver excellence that reflects your brand.
            </p>
            
            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#C9A14A] text-white font-semibold rounded-xl hover:bg-[#E8DFD6] hover:text-[#4A2E2A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                Get Quote
              </button>
              <button
                onClick={() => document.getElementById('sample-hampers')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-transparent border-2 border-[#C9A14A] text-[#4A2E2A] font-semibold rounded-xl hover:bg-[#C9A14A] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
              >
                View Samples
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
              Why Choose Our Corporate Gifting?
            </h2>
            <p className="text-lg text-[#4A2E2A]/70 max-w-2xl mx-auto">
              We understand the importance of corporate gifting in building lasting business relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bulk Orders */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-[#E8DFD6] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#C9A14A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">Bulk Orders</h3>
              <p className="text-[#4A2E2A]/80 leading-relaxed">
                Special pricing for bulk orders with volume discounts. Perfect for large-scale corporate events, 
                employee appreciation, and client gifting programs.
              </p>
            </div>

            {/* Customization */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-[#E8DFD6] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#C9A14A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">Full Customization</h3>
              <p className="text-[#4A2E2A]/80 leading-relaxed">
                Personalized packaging, custom messaging, and tailored product selections to match your brand 
                identity and gifting objectives perfectly.
              </p>
            </div>

            {/* Delivery */}
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-[#E8DFD6] hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#C9A14A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#C9A14A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#4A2E2A] mb-4">Nationwide Delivery</h3>
              <p className="text-[#4A2E2A]/80 leading-relaxed">
                Reliable delivery across India with tracking, insurance, and flexible scheduling. 
                We handle the logistics so you can focus on your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Hampers Section */}
      <section id="sample-hampers" className="py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
              Sample Corporate Hampers
            </h2>
            <p className="text-lg text-[#4A2E2A]/70 max-w-2xl mx-auto">
              Explore our curated selection of premium corporate gifting solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {corporateHampers.slice(0, 6).map((hamper) => (
              <ProductCard
                key={hamper.id}
                product={hamper}
                showTaxText={true}
              />
            ))}
          </div>

          {/* Custom Hamper CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#C9A14A]/10 to-[#E8DFD6]/30 rounded-xl p-8 border border-[#C9A14A]/20">
              <h3 className="text-2xl font-serif font-bold text-[#4A2E2A] mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-[#4A2E2A]/80 mb-6 max-w-2xl mx-auto">
                We specialize in creating bespoke corporate hampers tailored to your specific requirements, 
                budget, and brand guidelines.
              </p>
              <button
                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#C9A14A] text-white font-semibold rounded-xl hover:bg-[#E8DFD6] hover:text-[#4A2E2A] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2"
              >
                Discuss Custom Requirements
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
              What Our Corporate Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8DFD6]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#C9A14A] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">RS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4A2E2A]">Rahul Sharma</h4>
                  <p className="text-sm text-[#4A2E2A]/70">CEO, TechCorp India</p>
                </div>
              </div>
              <p className="text-[#4A2E2A]/80 leading-relaxed italic">
                "Sugar Rosette delivered exceptional corporate hampers for our annual client appreciation event. 
                The quality was outstanding and the delivery was flawless. Highly recommended for corporate gifting needs."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E8DFD6]">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#C9A14A] rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">PM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#4A2E2A]">Priya Mehta</h4>
                  <p className="text-sm text-[#4A2E2A]/70">HR Director, Global Solutions</p>
                </div>
              </div>
              <p className="text-[#4A2E2A]/80 leading-relaxed italic">
                "The custom employee appreciation hampers were a huge hit! The personalization options and 
                attention to detail made our team feel truly valued. Will definitely use their services again."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-form" className="py-16">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A2E2A] mb-4">
              Get Your Corporate Quote
            </h2>
            <p className="text-lg text-[#4A2E2A]/70 max-w-2xl mx-auto">
              Tell us about your corporate gifting requirements and we'll create a customized proposal for you
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-[#E8DFD6] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#4A2E2A] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-[#E8DFD6]'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#4A2E2A] mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:border-transparent transition-colors ${
                      errors.company ? 'border-red-500' : 'border-[#E8DFD6]'
                    }`}
                    placeholder="Enter your company name"
                  />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#4A2E2A] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-[#E8DFD6]'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#4A2E2A] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:border-transparent transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-[#E8DFD6]'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-[#4A2E2A] mb-2">
                  Gifting Requirements *
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:border-transparent transition-colors resize-none ${
                    errors.requirements ? 'border-red-500' : 'border-[#E8DFD6]'
                  }`}
                  placeholder="Please describe your corporate gifting requirements, budget, quantity, delivery timeline, and any specific preferences..."
                />
                {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements}</p>}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-12 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A14A] focus:ring-offset-2 ${
                    isSubmitting
                      ? 'bg-[#C9A14A]/50 text-white cursor-not-allowed'
                      : 'bg-[#C9A14A] text-white hover:bg-[#E8DFD6] hover:text-[#4A2E2A] shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Get Corporate Quote'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
      
      <Footer />
    </div>
  );
}
