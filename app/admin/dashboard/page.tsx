'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  UsersIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PlusIcon,
  ShoppingBagIcon,
  PhotoIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'Total Patients',
    value: '5,248',
    change: '+12%',
    up: true,
    icon: UsersIcon,
    color: 'bg-primary-50 text-primary-600',
    border: 'border-primary-200',
  },
  {
    label: 'Appointments Today',
    value: '12',
    change: '+3 from yesterday',
    up: true,
    icon: CalendarDaysIcon,
    color: 'bg-secondary-50 text-secondary-600',
    border: 'border-secondary-200',
  },
  {
    label: 'Revenue This Month',
    value: 'Rp 48.5M',
    change: '+8.2%',
    up: true,
    icon: CurrencyDollarIcon,
    color: 'bg-accent-50 text-accent-600',
    border: 'border-accent-200',
  },
  {
    label: 'Blog Posts',
    value: '6',
    change: '2 drafts',
    up: false,
    icon: DocumentTextIcon,
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-200',
  },
];

const APPOINTMENTS = [
  { id: 1, patient: 'Priscilla Tan', procedure: 'Botox & Fillers', date: '2026-03-09 10:00', status: 'confirmed', avatar: 'P' },
  { id: 2, patient: 'Dewi Rahayu', procedure: 'Laser Treatment', date: '2026-03-09 11:30', status: 'completed', avatar: 'D' },
  { id: 3, patient: 'Amirah Hassan', procedure: 'Skin Rejuvenation', date: '2026-03-09 13:00', status: 'confirmed', avatar: 'A' },
  { id: 4, patient: 'Cindy Wijaya', procedure: 'Chemical Peel', date: '2026-03-09 14:30', status: 'cancelled', avatar: 'C' },
  { id: 5, patient: 'Siti Nurhayati', procedure: 'Microblading', date: '2026-03-09 16:00', status: 'pending', avatar: 'S' },
];

const ACTIVITY = [
  { id: 1, text: 'New appointment booked by Priscilla Tan', time: '5 min ago', type: 'appointment' },
  { id: 2, text: 'Blog post "Botox Myths" published', time: '1 hour ago', type: 'blog' },
  { id: 3, text: 'Product "Vitamin C Serum" stock updated', time: '2 hours ago', type: 'product' },
  { id: 4, text: 'New gallery image uploaded (Laser Treatment)', time: '3 hours ago', type: 'gallery' },
  { id: 5, text: 'Appointment cancelled by Cindy Wijaya', time: '4 hours ago', type: 'appointment' },
  { id: 6, text: 'New patient registration: Siti Nurhayati', time: '5 hours ago', type: 'patient' },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

// ─── Simple bar chart ─────────────────────────────────────────────────────────

const CHART_DATA = [
  { month: 'Oct', value: 38 },
  { month: 'Nov', value: 52 },
  { month: 'Dec', value: 45 },
  { month: 'Jan', value: 60 },
  { month: 'Feb', value: 55 },
  { month: 'Mar', value: 72 },
];

function MiniBarChart() {
  const max = Math.max(...CHART_DATA.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-32">
      {CHART_DATA.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md bg-primary-500 opacity-80 hover:opacity-100 transition-opacity"
            style={{ height: `${(d.value / max) * 100}%` }}
            title={`${d.value}M`}
          />
          <span className="text-xs text-gray-500">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [appointments] = useState(APPOINTMENTS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          <ClockIcon className="w-4 h-4" />
          <span>Mon, 09 March 2026</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className="mt-1.5 text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1 text-xs font-medium ${s.up ? 'text-green-600' : 'text-gray-500'}`}>
              {s.up ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            New Blog Post
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ShoppingBagIcon className="w-4 h-4" />
            Add Product
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <PhotoIcon className="w-4 h-4" />
            Upload Gallery
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Appointments Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Today's Appointments</h2>
            <Link href="/admin/appointments" className="text-primary-600 text-sm font-medium hover:text-primary-700">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Procedure</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {appt.avatar}
                        </div>
                        <span className="font-medium text-gray-800">{appt.patient}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-gray-600">{appt.procedure}</td>
                    <td className="px-6 py-3.5 text-gray-500">
                      {appt.date.split(' ')[1]}
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={appt.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" title="Confirm">
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors" title="Cancel">
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Revenue (M IDR)</h2>
              <ChartBarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <MiniBarChart />
            <p className="text-xs text-gray-400 text-center mt-2">Oct 2025 – Mar 2026</p>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <BellAlertIcon className="w-4 h-4 text-gray-500" />
              <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <ul className="divide-y divide-gray-50">
              {ACTIVITY.map((item) => (
                <li key={item.id} className="px-5 py-3 hover:bg-gray-50/60 transition-colors">
                  <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
