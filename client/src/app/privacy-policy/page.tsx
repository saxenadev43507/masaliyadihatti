"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Shield className="w-10 h-10 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-serif font-black text-primary mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: April 29, 2026</p>
          </motion.div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 prose prose-gray prose-lg">
        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">At Masaliya Di Hatti, we collect information to provide you with the best shopping experience. This includes:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span><strong>Personal Information:</strong> Name, email address, phone number, and shipping address when you place an order or create an account.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span><strong>Payment Information:</strong> Credit card details are processed securely through our payment partners (Stripe, PayPal) and never stored on our servers.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span><strong>Usage Data:</strong> Browsing activity, pages visited, and interaction patterns to improve our website experience.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span><strong>Cookies:</strong> We use cookies to remember your preferences, cart items, and to provide personalized recommendations.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Your information helps us to:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Process and fulfill your orders accurately and efficiently.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Send order confirmations, shipping updates, and delivery notifications.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Provide customer support and respond to your enquiries.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Send promotional offers and newsletters (only with your consent).</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Improve our website, products, and overall customer experience.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except to trusted service providers who assist us in operating our website, conducting our business, or servicing you — provided those parties agree to keep your information confidential. This includes shipping carriers, payment processors, and analytics providers.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">4. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your personal information from unauthorized access, disclosure, or alteration.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">5. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">Under Australian Privacy Principles (APPs), you have the right to:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Access the personal information we hold about you.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Request correction of any inaccurate information.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Request deletion of your personal data.</span></li>
            <li className="flex items-start gap-2"><span className="text-accent font-bold mt-1">•</span> <span>Opt out of marketing communications at any time.</span></li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-serif font-black text-primary mb-4">6. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">If you have questions about this Privacy Policy, please contact us at <a href="mailto:enquiry@farhemaus.com" className="text-accent font-bold hover:underline">enquiry@farhemaus.com</a>.</p>
        </section>
      </article>
    </main>
  );
}
