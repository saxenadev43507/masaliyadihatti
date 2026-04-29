"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';

const contactInfo = [
  { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "enquiry@farhemaus.com", href: "mailto:enquiry@farhemaus.com" },
  { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "+61 4XX XXX XXX", href: "tel:+614XXXXXXXX" },
  { icon: <Clock className="w-5 h-5" />, label: "Business Hours", value: "Mon - Sat: 10AM - 8PM", href: null },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Melbourne, VIC, Australia", href: null },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-white pt-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 mb-16">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">Get in Touch</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-primary mb-6 tracking-tight">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              We&#39;d love to hear from you. Whether you have a question about our spices, need help with an order, or want to explore wholesale opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-serif font-black text-primary mb-2">Reach Out Anytime</h2>
              <p className="text-gray-500 text-sm mb-8">Our team is ready to assist you with anything spice-related.</p>
            </motion.div>

            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-accent/20 transition-all duration-500 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-1">{info.label}</span>
                  {info.href ? (
                    <a href={info.href} className="text-primary font-bold text-lg group-hover:text-accent transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-primary font-bold text-lg">{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-2xl overflow-hidden border border-gray-100 h-48 bg-gray-100 flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-400">Melbourne, Victoria</p>
                <p className="text-xs text-gray-400">Australia</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-full blur-[60px]" />
              
              <h3 className="text-xl font-serif font-black text-primary mb-2 relative z-10">Send Us a Message</h3>
              <p className="text-gray-500 text-sm mb-8 relative z-10">Fill out the form and we&#39;ll get back to you within 24 hours.</p>
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-serif font-black text-primary mb-2">Message Sent!</h4>
                  <p className="text-gray-500">We&#39;ll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium"
                      placeholder="+61 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent transition-all font-medium resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-sm font-black uppercase tracking-widest">Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
