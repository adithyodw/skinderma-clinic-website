'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FEATURED_BLOG_POSTS } from '@/lib/data';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon,
  PhotoIcon,
  TagIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  readTime: number;
  views?: number;
}

const CATEGORIES = ['procedures', 'skincare-tips', 'lifestyle', 'news', 'education'];

const INITIAL_POSTS: BlogPost[] = FEATURED_BLOG_POSTS.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  author: p.author,
  coverImage: p.coverImage,
  excerpt: p.excerpt,
  content: p.content ?? '',
  tags: p.tags ?? [],
  published: p.published,
  createdAt: p.createdAt,
  readTime: p.readTime,
  views: Math.floor(Math.random() * 3000) + 200,
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        published ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${published ? 'bg-green-500' : 'bg-amber-500'}`} />
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

// ─── Empty post ───────────────────────────────────────────────────────────────

const emptyPost = (): Omit<BlogPost, 'id'> => ({
  title: '',
  category: 'procedures',
  author: 'dr. Sarah Amalia',
  coverImage: '',
  excerpt: '',
  content: '',
  tags: [],
  published: false,
  createdAt: new Date(),
  readTime: 5,
  views: 0,
});

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  post: Omit<BlogPost, 'id'> & { id?: string };
  onClose: () => void;
  onSave: (post: Omit<BlogPost, 'id'> & { id?: string }, publish: boolean) => void;
  isEdit: boolean;
}

function PostModal({ post: initialPost, onClose, onSave, isEdit }: ModalProps) {
  const [form, setForm] = useState(initialPost);
  const [tagInput, setTagInput] = useState('');

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t]);
    setTagInput('');
  };

  const removeTag = (tag: string) =>
    set('tags', form.tags.filter((t) => t !== tag));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Edit Post' : 'New Blog Post'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-5">
          {/* Cover Image Preview */}
          {form.coverImage && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100">
              <Image src={form.coverImage} alt="Cover" fill className="object-cover" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image URL</label>
            <div className="relative">
              <PhotoIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => set('coverImage', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 capitalize bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="capitalize">{c.replace('-', ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set('author', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              placeholder="Brief description of the post..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => set('content', e.target.value)}
              rows={8}
              placeholder="Write your full article content here... (Markdown supported)"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-y font-mono"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium">
                  <TagIcon className="w-3 h-3" />
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tag and press Enter..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={addTag}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Publish post</p>
              <p className="text-xs text-gray-500">Make this post visible to the public</p>
            </div>
            <button
              onClick={() => set('published', !form.published)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.published ? 'bg-primary-500' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  form.published ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...form, published: false }, false)}
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => onSave({ ...form, published: true }, true)}
            className="px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <CheckCircleIcon className="w-4 h-4" />
            {isEdit ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete confirmation ──────────────────────────────────────────────────────

function DeleteDialog({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
          <TrashIcon className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 mb-1">Delete Post</h3>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete <span className="font-medium text-gray-700">"{title}"</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [modal, setModal] = useState<null | { type: 'create' | 'edit'; post: BlogPost | Omit<BlogPost, 'id'> & { id?: string } }>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [toast, setToast] = useState('');
  const nextId = useRef(posts.length + 1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' || (filter === 'published' ? p.published : !p.published);
    return matchesSearch && matchesFilter;
  });

  const handleSave = (data: Omit<BlogPost, 'id'> & { id?: string }) => {
    if (data.id) {
      setPosts((prev) => prev.map((p) => (p.id === data.id ? { ...p, ...data, id: p.id } : p)));
      showToast('Post updated successfully!');
    } else {
      const newPost: BlogPost = { ...data, id: String(nextId.current++) };
      setPosts((prev) => [newPost, ...prev]);
      showToast(data.published ? 'Post published!' : 'Draft saved!');
    }
    setModal(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    showToast('Post deleted.');
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckCircleIcon className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{posts.length} posts total</p>
        </div>
        <button
          onClick={() => setModal({ type: 'create', post: emptyPost() })}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors shadow-sm self-start sm:self-auto"
        >
          <PlusIcon className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-sm"
          />
        </div>
        <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          {(['all', 'published', 'draft'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                filter === f ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Post</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Author</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Views</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No posts found.
                  </td>
                </tr>
              )}
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {post.coverImage ? (
                          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <PhotoIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-800 truncate max-w-[200px]">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{post.readTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="capitalize text-gray-600">{post.category.replace('-', ' ')}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{post.author}</td>
                  <td className="px-5 py-4 text-gray-500 hidden lg:table-cell whitespace-nowrap">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge published={post.published} />
                  </td>
                  <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">
                    {(post.views ?? 0).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/blog/${post.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        title="Preview"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => setModal({ type: 'edit', post })}
                        className="p-2 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(post)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
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
      </div>

      {/* Modals */}
      {modal && (
        <PostModal
          post={modal.post as Omit<BlogPost, 'id'> & { id?: string }}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isEdit={modal.type === 'edit'}
        />
      )}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
