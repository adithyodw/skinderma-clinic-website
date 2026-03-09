'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getWhatsAppUrl } from '@/lib/data';
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user, userRole, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/patient-portal/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/');
    } catch {
      // silent
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const QUICK_ACTIONS = [
    {
      title: 'Book Appointment',
      desc: 'Schedule a consultation or treatment via WhatsApp',
      href: getWhatsAppUrl('Halo Skinderma! Saya ingin membuat janji temu.'),
      external: true,
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      title: 'Browse Treatments',
      desc: 'Explore our full range of aesthetic treatments',
      href: '/procedures',
      external: false,
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-600',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.39 2.42l-5.56-1.387a5.25 5.25 0 00-3.504 0l-5.56 1.388c-1.42.279-2.39-1.42-1.39-2.42L5 14.5" />
        </svg>
      ),
    },
    {
      title: 'Shop Skincare',
      desc: 'Browse our physician-curated skincare products',
      href: '/shop',
      external: false,
      iconBg: 'bg-accent-50',
      iconColor: 'text-accent-600',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-card hidden lg:flex">
        <div className="p-6 border-b border-gray-100">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Skinderma Aesthetic Clinic"
              width={150}
              height={38}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50">
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-dark truncate">
                {user.displayName || 'Patient'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: 'Dashboard', href: '/patient-portal/dashboard', Icon: Squares2X2Icon },
            { label: 'Appointments', href: '/patient-portal/appointments', Icon: CalendarDaysIcon },
            { label: 'Profile', href: '/patient-portal/profile', Icon: UserCircleIcon },
          ].map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                label === 'Dashboard'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
              }`}
            >
              <Icon className="w-4.5 h-4.5 w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Skinderma" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs text-gray-500 hover:text-red-500 font-medium flex items-center gap-1"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-5xl">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-playfair text-3xl text-dark">Patient Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back, {user.displayName || user.email}
            </p>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7 mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl text-dark">Upcoming Appointments</h2>
              <CalendarDaysIcon className="w-5 h-5 text-gray-300" />
            </div>
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <CalendarDaysIcon className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-dark font-semibold text-sm">No upcoming appointments</p>
              <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                Contact us via WhatsApp to book a consultation or treatment session.
              </p>
              <a
                href={getWhatsAppUrl('Halo Skinderma! Saya ingin membuat janji temu.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="font-playfair text-xl text-dark mb-5">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {QUICK_ACTIONS.map((action) => (
                action.external ? (
                  <a
                    key={action.title}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${action.iconBg} flex items-center justify-center mb-4 ${action.iconColor}`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-dark text-sm group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{action.desc}</p>
                  </a>
                ) : (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${action.iconBg} flex items-center justify-center mb-4 ${action.iconColor}`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-dark text-sm group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{action.desc}</p>
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Treatment History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-playfair text-xl text-dark">Treatment History</h2>
            </div>
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <p className="text-dark font-semibold text-sm">No treatment records yet</p>
              <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                Your treatment history will appear here after your first visit to Skinderma Aesthetic Clinic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
