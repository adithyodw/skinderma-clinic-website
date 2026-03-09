'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState('');
  const [savingName, setSavingName] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/patient-portal/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user]);

  const handleSignOut = async () => {
    await logOut();
    router.push('/');
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !displayName.trim()) return;
    setSavingName(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });
      toast.success('Name updated successfully.');
    } catch {
      toast.error('Failed to update name. Please try again.');
    } finally {
      setSavingName(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setSavingPassword(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error('Incorrect current password. Please try again.');
    } finally {
      setSavingPassword(false);
    }
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
                label === 'Profile'
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

        <div className="p-6 md:p-10 max-w-2xl">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl text-dark">My Profile</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account details and password.</p>
          </div>

          {/* Avatar & email */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-dark">{user.displayName || 'Patient'}</p>
              <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
              <span className="inline-block mt-1.5 text-xs bg-primary-50 text-primary-700 font-medium px-2.5 py-0.5 rounded-full">
                Patient Account
              </span>
            </div>
          </div>

          {/* Update display name */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-6">
            <h2 className="font-playfair text-xl text-dark mb-5">Display Name</h2>
            <form onSubmit={handleSaveName} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={savingName || !displayName.trim()}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingName ? 'Saving...' : 'Save Name'}
              </button>
            </form>
          </div>

          {/* Change password */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <h2 className="font-playfair text-xl text-dark mb-5">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
                className="px-6 py-2.5 rounded-xl bg-dark hover:bg-gray-800 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingPassword ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
