"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <FileText className="w-10 h-10 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-primary mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-gray-500 text-sm">Last updated: April 29, 2026</p>
          </motion.div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 prose prose-gray prose-lg">
        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">1. General Terms</h2>
          <p className="text-gray-600 leading-relaxed">By accessing and using the Masaliya Di Hatti website (masaliyadihatti.com.au), you agree to be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">2. Products & Pricing</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>All prices are listed in Australian Dollars (AUD) unless otherwise stated.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>We reserve the right to modify prices at any time without prior notice.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Product images are for illustration purposes and may vary slightly from the actual product.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>All products are subject to availability. We reserve the right to limit quantities.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">3. Orders & Payment</h2>
          <p className="text-gray-600 leading-relaxed mb-4">When you place an order, you are making an offer to purchase the products. We may accept or decline your order at our discretion. Payment is required at the time of ordering and is processed securely through our payment partners.</p>
          <p className="text-gray-600 leading-relaxed">We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, Shop Pay, and Union Pay.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">4. Shipping & Delivery</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Free shipping on orders over $50 AUD within Australia.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Standard delivery within Australia: 3-7 business days.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Express delivery: 1-3 business days (additional charges apply).</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>International shipping is available to select countries. Delivery times vary.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Due to ongoing cargo delays, some items may experience extended shipping times.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">5. Returns & Refunds</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Due to the nature of food products, we have specific return policies:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Damaged or defective products may be returned within 7 days of delivery for a full refund or replacement.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Opened food products cannot be returned for hygiene and safety reasons.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Refunds will be processed within 5-10 business days to the original payment method.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Please contact us with photos of any damaged items at enquiry@farhemaus.com.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">6. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">All content on this website including text, graphics, logos, images, and software is the property of Masaliya Di Hatti or its content suppliers and is protected by Australian and international copyright laws. Unauthorized use or reproduction of any materials is strictly prohibited.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">Masaliya Di Hatti shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability is limited to the amount paid for the specific product or service giving rise to the claim.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">8. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">These terms are governed by the laws of the State of Victoria, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Victoria.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">9. Contact</h2>
          <p className="text-gray-600 leading-relaxed">For any questions regarding these Terms of Service, please contact us at <a href="mailto:enquiry@farhemaus.com" className="text-accent font-bold hover:underline">enquiry@farhemaus.com</a>.</p>
        </section>
      </article>
    </main>
  );
}
