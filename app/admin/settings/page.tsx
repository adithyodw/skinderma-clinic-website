'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  CLINIC_ADDRESS,
  CLINIC_PHONE,
  CLINIC_EMAIL,
  CLINIC_INSTAGRAM,
  CLINIC_FACEBOOK,
  BUSINESS_HOURS,
  WHATSAPP_NUMBER,
} from '@/lib/data';

type Tab = 'general' | 'hours' | 'social';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  const [general, setGeneral] = useState({
    clinicName: 'Skinderma Aesthetic Clinic',
    tagline: 'Batam Acne & Melasma Centre',
    phone: CLINIC_PHONE,
    email: CLINIC_EMAIL,
    address: CLINIC_ADDRESS,
  });

  const [hours, setHours] = useState(
    BUSINESS_HOURS.map((h) => ({ ...h }))
  );

  const [social, setSocial] = useState({
    instagram: CLINIC_INSTAGRAM,
    facebook: CLINIC_FACEBOOK,
    whatsapp: WHATSAPP_NUMBER,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully.');
  };

  const TABS: { value: Tab; label: string }[] = [
    { value: 'general', label: 'General' },
    { value: 'hours', label: 'Business Hours' },
    { value: 'social', label: 'Social Media' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-dark">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your clinic information, hours, and social media links.
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.value
                ? 'bg-white text-dark shadow-sm'
                : 'text-gray-500 hover:text-dark'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── GENERAL TAB ─────────────────────────────────────────────── */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 max-w-2xl">
          <h2 className="font-playfair text-xl text-dark mb-6">General Information</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Clinic Name
              </label>
              <input
                type="text"
                value={general.clinicName}
                onChange={(e) => setGeneral((p) => ({ ...p, clinicName: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={general.tagline}
                onChange={(e) => setGeneral((p) => ({ ...p, tagline: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={general.phone}
                onChange={(e) => setGeneral((p) => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={general.email}
                onChange={(e) => setGeneral((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Clinic Address
              </label>
              <textarea
                value={general.address}
                onChange={(e) => setGeneral((p) => ({ ...p, address: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── BUSINESS HOURS TAB ──────────────────────────────────────── */}
      {activeTab === 'hours' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 max-w-2xl">
          <h2 className="font-playfair text-xl text-dark mb-6">Business Hours — Batam Centre</h2>
          <div className="space-y-3">
            {hours.map((h, i) => (
              <div key={h.day} className="grid grid-cols-4 gap-4 items-center">
                <span className="text-sm font-medium text-dark">{h.day}</span>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Open</label>
                  <input
                    type="time"
                    value={h.open}
                    onChange={(e) => {
                      const updated = [...hours];
                      updated[i] = { ...updated[i], open: e.target.value };
                      setHours(updated);
                    }}
                    disabled={h.closed}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 disabled:opacity-40 disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Close</label>
                  <input
                    type="time"
                    value={h.close}
                    onChange={(e) => {
                      const updated = [...hours];
                      updated[i] = { ...updated[i], close: e.target.value };
                      setHours(updated);
                    }}
                    disabled={h.closed}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 disabled:opacity-40 disabled:bg-gray-50"
                  />
                </div>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={h.closed}
                      onChange={(e) => {
                        const updated = [...hours];
                        updated[i] = { ...updated[i], closed: e.target.checked };
                        setHours(updated);
                      }}
                      className="w-4 h-4 rounded text-primary-600 accent-primary-600"
                    />
                    <span className="text-xs text-gray-500">Closed</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SOCIAL MEDIA TAB ────────────────────────────────────────── */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 max-w-2xl">
          <h2 className="font-playfair text-xl text-dark mb-6">Social Media &amp; Contact Links</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={social.instagram}
                onChange={(e) => setSocial((p) => ({ ...p, instagram: e.target.value }))}
                placeholder="https://www.instagram.com/..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={social.facebook}
                onChange={(e) => setSocial((p) => ({ ...p, facebook: e.target.value }))}
                placeholder="https://www.facebook.com/..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={social.whatsapp}
                onChange={(e) => setSocial((p) => ({ ...p, whatsapp: e.target.value }))}
                placeholder="6281261884912 (no + or spaces)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <p className="text-xs text-gray-400 mt-1.5">Format: country code + number, no spaces or + (e.g. 6281261884912)</p>
            </div>
          </div>
        </div>
      )}

      {/* Save button */}
      <div className="mt-8">
        <button
          onClick={handleSave}
          className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all duration-200 shadow-luxury hover:shadow-luxury-lg"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
