"use client";

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';

interface SiteSettings {
  storeName: string;
  email: string;
  phone: string;
  announcement: string;
  currency: string;
  freeShippingMin: string;
  adminPassword: string;
}

const defaultSettings: SiteSettings = {
  storeName: "Masaliya Di Hatti",
  email: "enquiry@farhemaus.com",
  phone: "+61 4XX XXX XXX",
  announcement: "DUE TO ONGOING CARGO DELAY MOST OF THE ITEMS ARE SOLD OUT. PLEASE REACH OUT TO .....",
  currency: "AUD",
  freeShippingMin: "50",
  adminPassword: "admin123",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem('masaliya-admin-settings');
      if (s) setSettings(JSON.parse(s));
    } catch { /* empty */ }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('masaliya-admin-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your store configuration</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Store Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-bold text-gray-900 mb-6">Store Information</h2>
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Store Name</label>
              <input type="text" value={settings.storeName} onChange={e => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Contact Email</label>
                <input type="email" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Phone Number</label>
                <input type="text" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Announcement */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-bold text-gray-900 mb-6">Announcement Bar</h2>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Banner Text</label>
            <textarea rows={2} value={settings.announcement} onChange={e => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none" />
          </div>
        </div>

        {/* Shop Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-bold text-gray-900 mb-6">Shop Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Currency</label>
              <select value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none cursor-pointer">
                <option>AUD</option><option>USD</option><option>INR</option><option>GBP</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Free Shipping Minimum ($)</label>
              <input type="number" value={settings.freeShippingMin} onChange={e => setSettings({ ...settings, freeShippingMin: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="font-bold text-gray-900 mb-6">Security</h2>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 block mb-2">Admin Password</label>
            <input type="text" value={settings.adminPassword} onChange={e => setSettings({ ...settings, adminPassword: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
            <p className="text-xs text-gray-400 mt-1">Change the admin login password</p>
          </div>
        </div>

        <button type="submit" className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${saved ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Settings Saved!' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
