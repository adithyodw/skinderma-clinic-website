'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PROCEDURES } from '@/lib/data';
import toast from 'react-hot-toast';
import {
  UsersIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PatientRecord {
  id: string;
  email: string;
  displayName?: string;
  createdAt?: Timestamp;
}

interface TreatmentRecord {
  id: string;
  patientEmail: string;
  procedure: string;
  date: string;
  notes: string;
  doctor: string;
  sessions: number;
  createdAt?: Timestamp;
}

// ── Treatment Editor Modal ─────────────────────────────────────────────────────

function TreatmentModal({
  patient,
  records,
  onClose,
  onSaved,
}: {
  patient: PatientRecord;
  records: TreatmentRecord[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    procedure: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    doctor: 'dr. Yeyen Handoko',
    sessions: 1,
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TreatmentRecord>>({});

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.procedure || !form.date) {
      toast.error('Please select a procedure and date.');
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, 'treatmentHistory'), {
        patientEmail: patient.email,
        patientName: patient.displayName || patient.email,
        procedure: form.procedure,
        date: form.date,
        notes: form.notes,
        doctor: form.doctor,
        sessions: form.sessions,
        createdAt: serverTimestamp(),
      });
      toast.success('Treatment record added.');
      setForm({ procedure: '', date: new Date().toISOString().split('T')[0], notes: '', doctor: 'dr. Yeyen Handoko', sessions: 1 });
      onSaved();
    } catch {
      toast.error('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'treatmentHistory', id));
      toast.success('Record deleted.');
      onSaved();
    } catch {
      toast.error('Failed to delete.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditSave = async (id: string) => {
    try {
      await updateDoc(doc(db, 'treatmentHistory', id), {
        procedure: editForm.procedure,
        date: editForm.date,
        notes: editForm.notes,
        doctor: editForm.doctor,
        sessions: editForm.sessions,
      });
      toast.success('Record updated.');
      setEditingId(null);
      onSaved();
    } catch {
      toast.error('Failed to update.');
    }
  };

  const patientRecords = records.filter((r) => r.patientEmail === patient.email);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">Treatment History</h2>
            <p className="text-sm text-gray-500 mt-0.5">{patient.displayName || patient.email}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Existing records */}
        <div className="px-6 py-4">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Existing Records ({patientRecords.length})
          </h3>
          {patientRecords.length === 0 ? (
            <p className="text-sm text-gray-400 italic py-3">No treatment records yet.</p>
          ) : (
            <div className="space-y-3 mb-6">
              {patientRecords.map((r) =>
                editingId === r.id ? (
                  <div key={r.id} className="border border-primary-200 rounded-xl p-4 bg-primary-50/40 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Procedure</label>
                        <select
                          value={editForm.procedure}
                          onChange={(e) => setEditForm((p) => ({ ...p, procedure: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400"
                        >
                          {PROCEDURES.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Date</label>
                        <input
                          type="date"
                          value={editForm.date}
                          onChange={(e) => setEditForm((p) => ({ ...p, date: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Doctor</label>
                        <input
                          type="text"
                          value={editForm.doctor}
                          onChange={(e) => setEditForm((p) => ({ ...p, doctor: e.target.value }))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Sessions</label>
                        <input
                          type="number"
                          min={1}
                          value={editForm.sessions}
                          onChange={(e) => setEditForm((p) => ({ ...p, sessions: Number(e.target.value) }))}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Notes</label>
                      <textarea
                        rows={2}
                        value={editForm.notes}
                        onChange={(e) => setEditForm((p) => ({ ...p, notes: e.target.value }))}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400 resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSave(r.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-xs font-semibold hover:bg-primary-700 transition-colors"
                      >
                        <CheckIcon className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={r.id} className="border border-gray-100 rounded-xl p-4 flex items-start gap-3 hover:border-gray-200 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-gray-800">{r.procedure}</span>
                        <span className="text-xs text-gray-400">&bull;</span>
                        <span className="text-xs text-gray-500">{r.date}</span>
                        <span className="text-xs bg-primary-50 text-primary-700 font-medium px-2 py-0.5 rounded-full">
                          {r.sessions} session{r.sessions !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{r.doctor}</p>
                      {r.notes && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.notes}</p>}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => { setEditingId(r.id); setEditForm(r); }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Add new record form */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Add New Record</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Procedure *</label>
                  <select
                    value={form.procedure}
                    onChange={(e) => setForm((p) => ({ ...p, procedure: e.target.value }))}
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-primary-400 transition-colors"
                  >
                    <option value="">Select procedure...</option>
                    {PROCEDURES.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    required
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Doctor</label>
                  <input
                    type="text"
                    value={form.doctor}
                    onChange={(e) => setForm((p) => ({ ...p, doctor: e.target.value }))}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Sessions</label>
                  <input
                    type="number"
                    min={1}
                    value={form.sessions}
                    onChange={(e) => setForm((p) => ({ ...p, sessions: Number(e.target.value) }))}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">Notes (optional)</label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="e.g. Patient responded well. Skin sensitivity noted. Next session in 4 weeks."
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-4 h-4" />
                {saving ? 'Saving...' : 'Add Record'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [allRecords, setAllRecords] = useState<TreatmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersSnap, recordsSnap] = await Promise.all([
        getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'treatmentHistory'), orderBy('date', 'desc'))),
      ]);

      setPatients(
        usersSnap.docs.map((d) => ({
          id: d.id,
          email: d.data().email || '',
          displayName: d.data().displayName || d.data().name || '',
          createdAt: d.data().createdAt,
        }))
      );

      setAllRecords(
        recordsSnap.docs.map((d) => ({
          id: d.id,
          patientEmail: d.data().patientEmail || '',
          procedure: d.data().procedure || '',
          date: d.data().date || '',
          notes: d.data().notes || '',
          doctor: d.data().doctor || '',
          sessions: d.data().sessions || 1,
          createdAt: d.data().createdAt,
        }))
      );
    } catch {
      toast.error('Failed to load patient data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = patients.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.email.toLowerCase().includes(q) || (p.displayName || '').toLowerCase().includes(q);
  });

  const recordCount = (email: string) => allRecords.filter((r) => r.patientEmail === email).length;

  return (
    <>
      {selectedPatient && (
        <TreatmentModal
          patient={selectedPatient}
          records={allRecords}
          onClose={() => setSelectedPatient(null)}
          onSaved={fetchData}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              View registered patients and manage their treatment history.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <UsersIcon className="w-4 h-4" />
            <span>{patients.length} registered patient{patients.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <UsersIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">
                {search ? 'No patients match your search.' : 'No registered patients yet.'}
              </p>
              <p className="text-gray-400 text-xs mt-1">Patients appear here once they register via the Patient Portal.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Records</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {(p.displayName || p.email).charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">{p.displayName || '—'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{p.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recordCount(p.email) > 0 ? 'bg-primary-50 text-primary-700' : 'bg-gray-100 text-gray-500'}`}>
                          {recordCount(p.email)} treatment{recordCount(p.email) !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedPatient(p)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold hover:bg-primary-100 transition-colors"
                        >
                          <PencilSquareIcon className="w-3.5 h-3.5" />
                          Manage History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
