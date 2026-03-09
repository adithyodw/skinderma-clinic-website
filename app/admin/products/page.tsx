'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { TrashIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FEATURED_PRODUCTS } from '@/lib/data';
import { Product } from '@/lib/types';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID').format(price);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);

  const handleDelete = (id: string, name: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success(`"${name}" has been removed.`);
  };

  const handleEdit = (name: string) => {
    toast('Edit functionality coming soon.', { icon: undefined });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl text-dark">Product Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the products displayed in the Skinderma shop.
          </p>
        </div>
        <button
          onClick={() => toast('Add product form coming soon.')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-colors shadow-luxury"
        >
          <PlusIcon className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Brand</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price (IDR)</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Stock</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-dark text-sm truncate max-w-[180px]">{product.name}</p>
                        <p className="text-gray-400 text-xs truncate max-w-[180px]">{product.nameId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{product.brand}</span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-dark text-sm">{formatPrice(product.priceIdr)}</span>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-600">{product.stock} units</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product.name)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-sm">No products found. Add your first product above.</p>
          </div>
        )}

        {/* Table footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">{products.length} product{products.length !== 1 ? 's' : ''} total</p>
          <p className="text-xs text-gray-400">
            {products.filter((p) => p.inStock).length} in stock &middot; {products.filter((p) => !p.inStock).length} out of stock
          </p>
        </div>
      </div>
    </div>
  );
}
