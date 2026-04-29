"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Crown, HeadphonesIcon, Send, CheckCircle, Package, Globe, Users, Percent } from 'lucide-react';

const benefits = [
  { icon: <Percent className="w-6 h-6" />, title: "Bulk Discounts", desc: "Up to 40% off on wholesale orders across all brands." },
  { icon: <Truck className="w-6 h-6" />, title: "Global Shipping", desc: "Reliable delivery to 30+ countries worldwide." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Dedicated Support", desc: "Personal account manager for all your needs." },
  { icon: <Shield className="w-6 h-6" />, title: "Quality Guaranteed", desc: "100% authentic spices with quality certifications." },
  { icon: <Package className="w-6 h-6" />, title: "Custom Packaging", desc: "White-label and custom packaging available." },
  { icon: <Globe className="w-6 h-6" />, title: "Wide Selection", desc: "Access to 200+ premium spice products." },
];

const stats = [
  { number: "500+", label: "Distribution Partners" },
  { number: "30+", label: "Countries Served" },
  { number: "200+", label: "Products Available" },
  { number: "98%", label: "Client Satisfaction" },
];

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    companyName: '', contactPerson: '', email: '', phone: '',
    abn: '', productInterest: '', estimatedQty: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ companyName: '', contactPerson: '', email: '', phone: '', abn: '', productInterest: '', estimatedQty: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-gray-900 to-primary py-24 mb-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Wholesale Program</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight">
              Exclusive <span className="text-accent">Wholesale</span> Deals
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              We genuinely appreciate your interest and look forward to the opportunity to serve you. Kindly complete the form below, and we&#39;ll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-accent mb-1">{stat.number}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Why Partner With Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-primary tracking-tight">
            Wholesale <span className="text-accent">Benefits</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300 mb-5">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-accent/5 rounded-full blur-[80px]" />

          <div className="text-center mb-10 relative z-10">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-3 block">Start Your Partnership</span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-primary mb-2">Wholesale Enquiry Form</h2>
            <p className="text-gray-500 text-sm">Fill out the details below and our team will reach out within 48 hours.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-2xl font-serif font-black text-primary mb-2">Enquiry Submitted!</h4>
              <p className="text-gray-500">Our wholesale team will contact you within 48 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Company Name *</label>
                  <input type="text" required value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="Your company name" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Contact Person *</label>
                  <input type="text" required value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="Full name" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="email@company.com" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="+61 XXX XXX XXX" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">ABN (Optional)</label>
                  <input type="text" value={formData.abn} onChange={e => setFormData({ ...formData, abn: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="Australian Business Number" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Product Interest</label>
                  <select value={formData.productInterest} onChange={e => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium appearance-none cursor-pointer">
                    <option value="">Select category</option>
                    <option value="whole-spices">Whole Spices</option>
                    <option value="ground-spices">Ground Spices</option>
                    <option value="blended-masalas">Blended Masalas</option>
                    <option value="pickles-chutneys">Pickles & Chutneys</option>
                    <option value="ghee">Premium Ghee</option>
                    <option value="all">All Products</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Estimated Monthly Quantity</label>
                <input type="text" value={formData.estimatedQty} onChange={e => setFormData({ ...formData, estimatedQty: e.target.value })}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium" placeholder="e.g., 500 units/month" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Additional Message</label>
                <textarea rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium resize-none" placeholder="Tell us about your requirements..." />
              </div>
              <button type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]">
                <Send className="w-4 h-4" />
                <span className="text-sm font-black uppercase tracking-widest">Submit Enquiry</span>
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </main>
  );
}
