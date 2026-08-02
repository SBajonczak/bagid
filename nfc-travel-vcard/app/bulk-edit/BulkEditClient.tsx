'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

interface BulkEditClientProps {
  tagIds: string[];
}

const BulkEditClient: React.FC<BulkEditClientProps> = ({ tagIds }) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const { language: lang } = useLanguage();
  const t = messages[lang].bulkEdit;
  const tCard = messages[lang].travelCard;

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerMobile: '',
    ownerAddress: '',
    transportation: '',
    transportationNumber: '',
    transportationDate: '',
    destinationAccommodation: '',
    destinationAddress: '',
    guideFirstName: '',
    guideLastName: '',
    guideMobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = await getToken();
      const response = await fetch('/api/tags/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tagIds, data: formData }),
      });

      if (response.ok) {
        alert(t.success);
        router.push('/dashboard');
      } else {
        alert(t.error);
      }
    } catch (err) {
      console.error('Bulk edit error:', err);
      alert(t.error);
    } finally {
      setSaving(false);
    }
  };

  const noticeText = t.notice.replace('{n}', String(tagIds.length));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavigationBar />

      <main className="flex-grow">
        <section className="bg-slate-950 px-4 py-12 text-white sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-lime-300">
                {tCard.secureAccessMessage}
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {t.title}
              </h1>
              <p className="text-base text-slate-200">{noticeText}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-amber-300">
                {t.hint}
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center justify-center rounded-xl bg-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:py-12">
          <div className="mx-auto max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-8">

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{tCard.about}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.firstName}</label>
                    <input
                      type="text"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.lastName}</label>
                    <input
                      type="text"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.email}</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.mobile}</label>
                    <input
                      type="tel"
                      name="ownerMobile"
                      value={formData.ownerMobile}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">{tCard.address}</label>
                    <textarea
                      name="ownerAddress"
                      value={formData.ownerAddress}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{tCard.travelData}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.provider}</label>
                    <input
                      type="text"
                      name="transportation"
                      value={formData.transportation}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.details}</label>
                    <input
                      type="text"
                      name="transportationNumber"
                      value={formData.transportationNumber}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.date}</label>
                    <input
                      type="date"
                      name="transportationDate"
                      value={formData.transportationDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{tCard.destinationaddress}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.destinationaddress_Accmodation}</label>
                    <input
                      type="text"
                      name="destinationAccommodation"
                      value={formData.destinationAccommodation}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.address}</label>
                    <textarea
                      name="destinationAddress"
                      value={formData.destinationAddress}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">{tCard.guide}</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.firstName}</label>
                    <input
                      type="text"
                      name="guideFirstName"
                      value={formData.guideFirstName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{tCard.lastName}</label>
                    <input
                      type="text"
                      name="guideLastName"
                      value={formData.guideLastName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">{tCard.mobile}</label>
                    <input
                      type="tel"
                      name="guideMobile"
                      value={formData.guideMobile}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {saving ? t.saving : t.save}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="flex-1 rounded-xl border border-slate-300 px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BulkEditClient;
