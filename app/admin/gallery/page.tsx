'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { TrashIcon, PlusIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { GALLERY_ITEMS } from '@/lib/data';
import { GalleryItem } from '@/lib/types';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Gallery item removed.');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-dark">Gallery Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage before/after treatment photos displayed on the website.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-luxury"
        >
          <PlusIcon className="w-4 h-4" />
          Add Before/After
        </button>
      </div>

      {/* Upload dropzone */}
      <div className="mb-8 border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary-300 transition-colors cursor-pointer group">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
          <ArrowUpTrayIcon className="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
        </div>
        <p className="text-dark font-semibold text-sm">Drag images here or click to upload</p>
        <p className="text-gray-400 text-xs mt-1">Supported: JPG, PNG, WebP — Max 5MB each</p>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-0">
              <div className="relative aspect-square">
                <Image
                  src={item.beforeUrl}
                  alt={`Before - ${item.procedure}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-semibold">
                  Before
                </div>
              </div>
              <div className="relative aspect-square">
                <Image
                  src={item.afterUrl}
                  alt={`After - ${item.procedure}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary-600/80 text-white text-xs font-semibold">
                  After
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-dark text-sm">{item.procedure}</h3>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.caption}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.featured ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.featured ? 'Featured' : 'Not Featured'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm">No gallery items. Add your first before/after photo above.</p>
        </div>
      )}

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-xl text-dark">Add Before/After</h2>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">Procedure Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nd:YAG Laser — Melasma"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">Caption</label>
                <input
                  type="text"
                  placeholder="Brief description of results"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">Before Image</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary-300 cursor-pointer transition-colors">
                    <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Upload Before</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark uppercase tracking-widest mb-2">After Image</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-primary-300 cursor-pointer transition-colors">
                    <ArrowUpTrayIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-400">Upload After</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  toast.success('Gallery item added.');
                  setShowModal(false);
                }}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-luxury"
              >
                Save Gallery Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
