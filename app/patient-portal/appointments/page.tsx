'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getWhatsAppUrl, PROCEDURES } from '@/lib/data';
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const SERVICES = PROCEDURES.filter((p) => p.featured).slice(0, 6);

export default function AppointmentsPage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/patient-portal/login');
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await logOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex-col shadow-card hidden lg:flex">
        <div className="p-6 border-b border-gray-100">
          <Link href="/">
            <Image src="/logo.svg" alt="Skinderma" width={150} height={38} className="h-10 w-auto" />
          </Link>
        </div>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50">
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-dark truncate">{user.displayName || 'Patient'}</p>
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
                label === 'Appointments'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-dark'
              }`}
            >
              <Icon className="w-5 h-5" />
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

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="Skinderma" width={120} height={30} className="h-8 w-auto" />
          </Link>
          <button onClick={handleSignOut} className="text-xs text-gray-500 hover:text-red-500 font-medium flex items-center gap-1">
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="p-6 md:p-10 max-w-4xl">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl text-dark">Book an Appointment</h1>
            <p className="text-gray-500 text-sm mt-1">
              Select a treatment below and we will connect you via WhatsApp to confirm your appointment.
            </p>
          </div>

          {/* Info banner */}
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 mb-8 flex gap-4">
            <CalendarDaysIcon className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-dark">Clinic Hours</p>
              <p className="text-xs text-gray-500 mt-0.5">Monday – Sunday, 10:00 – 19:00 WIB (Batam Centre)</p>
              <p className="text-xs text-amber-600 mt-0.5">Tembesi/Batu Aji branch is closed on Thursdays.</p>
            </div>
          </div>

          {/* Treatments grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {SERVICES.map((p) => (
              <a
                key={p.id}
                href={getWhatsAppUrl(`Halo Skinderma! Saya ingin membuat janji untuk ${p.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 hover:border-primary-200 hover:shadow-luxury transition-all duration-300 group flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  <CalendarDaysIcon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-dark text-sm group-hover:text-primary-700 transition-colors truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.duration}{p.priceFrom ? ` \u2022 From Rp ${p.priceFrom.toLocaleString()}` : ''}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-primary-400 flex-shrink-0 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-7 text-center">
            <p className="text-sm font-semibold text-dark mb-1">Prefer to chat directly?</p>
            <p className="text-xs text-gray-400 mb-5">Our team responds within clinic hours via WhatsApp.</p>
            <a
              href={getWhatsAppUrl('Halo Skinderma! Saya ingin membuat janji temu.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
