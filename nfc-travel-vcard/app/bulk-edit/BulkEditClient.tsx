'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import { FlightLeg } from '@/lib/types';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none';

const emptyLeg = (type: 'outbound' | 'return'): FlightLeg => ({
  journeyType: type, sequence: 1, carrier: '', flightNumber: '',
  departureAirport: '', departureDatetime: '', arrivalAirport: '', arrivalDatetime: '',
});

interface FlightLegsSectionProps {
  legs: FlightLeg[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tfl: Record<string, any>;
  onAddLeg: (type: 'outbound' | 'return') => void;
  onRemoveLeg: (idx: number) => void;
  onChangeLeg: (idx: number, field: keyof FlightLeg, value: string) => void;
}

const BulkFlightLegsSection: React.FC<FlightLegsSectionProps> = ({ legs, tfl, onAddLeg, onRemoveLeg, onChangeLeg }) => {
  const renderLegs = (type: 'outbound' | 'return', typeLabel: string, addLabel: string) => {
    const typed = legs.map((l, i) => ({ l, i })).filter(({ l }) => l.journeyType === type);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800">{typeLabel}</h3>
          <button type="button" onClick={() => onAddLeg(type)}
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors">
            + {addLabel}
          </button>
        </div>
        {typed.map(({ l, i }, segIdx) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{tfl.segment} {segIdx + 1}</span>
              <button type="button" onClick={() => onRemoveLeg(i)} className="text-xs text-red-500 hover:text-red-700">{tfl.remove}</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.carrier}</label>
                <input type="text" value={l.carrier} onChange={e => onChangeLeg(i, 'carrier', e.target.value)} className={inputCls} /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.flightNumber}</label>
                <input type="text" value={l.flightNumber} onChange={e => onChangeLeg(i, 'flightNumber', e.target.value)} className={inputCls} placeholder="LH 400" /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.depAirport}</label>
                <input type="text" value={l.departureAirport} onChange={e => onChangeLeg(i, 'departureAirport', e.target.value)} className={inputCls} placeholder="FRA" maxLength={4} /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.depTime}</label>
                <input type="datetime-local" value={l.departureDatetime ? l.departureDatetime.slice(0, 16) : ''} onChange={e => onChangeLeg(i, 'departureDatetime', e.target.value)} className={inputCls} /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.arrAirport}</label>
                <input type="text" value={l.arrivalAirport} onChange={e => onChangeLeg(i, 'arrivalAirport', e.target.value)} className={inputCls} placeholder="JFK" maxLength={4} /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">{tfl.arrTime}</label>
                <input type="datetime-local" value={l.arrivalDatetime ? l.arrivalDatetime.slice(0, 16) : ''} onChange={e => onChangeLeg(i, 'arrivalDatetime', e.target.value)} className={inputCls} /></div>
            </div>
          </div>
        ))}
        {typed.length === 0 && <p className="text-sm text-slate-400 italic">{tfl.noLegs}</p>}
      </div>
    );
  };
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">{tfl.title}</h2>
      <div className="space-y-8">
        {renderLegs('outbound', tfl.outbound, tfl.addOutbound)}
        <hr className="border-slate-200" />
        {renderLegs('return', tfl.return, tfl.addReturn)}
      </div>
    </section>
  );
};

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
  const [flightLegs, setFlightLegs] = useState<FlightLeg[]>([]);
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

  const handleAddLeg = (type: 'outbound' | 'return') => {
    setFlightLegs(prev => [...prev, emptyLeg(type)]);
  };

  const handleRemoveLeg = (idx: number) => {
    setFlightLegs(prev => prev.filter((_, i) => i !== idx));
  };

  const handleLegChange = (idx: number, field: keyof FlightLeg, value: string) => {
    setFlightLegs(prev => prev.map((leg, i) => i === idx ? { ...leg, [field]: value } : leg));
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
        body: JSON.stringify({ tagIds, data: formData, legs: flightLegs.length > 0 ? flightLegs : undefined }),
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

              <BulkFlightLegsSection
                legs={flightLegs}
                tfl={messages[lang].flightLegs}
                onAddLeg={handleAddLeg}
                onRemoveLeg={handleRemoveLeg}
                onChangeLeg={handleLegChange}
              />

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
