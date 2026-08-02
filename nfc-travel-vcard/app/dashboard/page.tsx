'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { QrCode, Loader2, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { useAuth } from '../components/AuthProvider';

interface Tag {
  tagId: string;
  tagName: string;
  ownerFirstName?: string;
  ownerLastName?: string;
  hasData: boolean;
}

export default function DashboardPage() {
  const { language: lang } = useLanguage();
  const { isAuthenticated, getToken } = useAuth();
  const router = useRouter();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const t = messages[lang].dashboard;

  useEffect(() => {
    async function fetchTags() {
      if (!isAuthenticated) return;

      try {
        const token = await getToken();
        if (!token) {
          console.error("No token available");
          return;
        }

        const res = await fetch(`/api/user/tags`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setTags(data);
        }
      } catch (error) {
        console.error("Failed to fetch tags", error);
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      fetchTags();
    } else {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, getToken]);

  const toggleSelectionMode = () => {
    setSelectionMode(prev => !prev);
    setSelectedTags(new Set());
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  };

  const handleBulkEdit = () => {
    const ids = [...selectedTags].join(',');
    router.push(`/bulk-edit?tags=${ids}`);
  };

  const bulkEditLabel = t.bulkEdit.replace('{n}', String(selectedTags.size));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavigationBar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
              <p className="mt-2 text-slate-600">{t.subtitle}</p>
            </div>
            {tags.length > 0 && (
              <div className="flex items-center gap-3 flex-shrink-0">
                {selectionMode && selectedTags.size > 0 && (
                  <button
                    onClick={handleBulkEdit}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                  >
                    {bulkEditLabel}
                  </button>
                )}
                <button
                  onClick={toggleSelectionMode}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                    selectionMode
                      ? 'border-slate-400 bg-slate-200 text-slate-700 hover:bg-slate-300'
                      : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {selectionMode ? t.cancelSelect : t.selectMode}
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
          ) : !isAuthenticated ? (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">{t.pleaseLogin}</p>
            </div>
          ) : tags.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <QrCode className="mx-auto h-12 w-12 text-slate-300" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{t.noTagsMessage}</h3>
              <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                {t.scanHint}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => {
                const isSelected = selectedTags.has(tag.tagId);
                return (
                  <div
                    key={tag.tagId}
                    onClick={selectionMode ? () => toggleTag(tag.tagId) : undefined}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all ${
                      selectionMode
                        ? 'cursor-pointer hover:shadow-md ' + (isSelected
                            ? 'border-blue-500 ring-2 ring-blue-400'
                            : 'border-slate-200 hover:border-slate-300')
                        : 'border-slate-200 hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    <div className="p-6 flex-grow">
                      <div className="mb-4 flex items-center justify-between">
                        <div className={`rounded-full p-2.5 transition-colors ${
                          isSelected && selectionMode
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                        }`}>
                          {selectionMode ? (
                            isSelected
                              ? <CheckSquare className="h-5 w-5" />
                              : <Square className="h-5 w-5" />
                          ) : (
                            <QrCode className="h-5 w-5" />
                          )}
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
                          {tag.tagId}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 line-clamp-1">
                        {tag.tagName || `Tag ${tag.tagId}`}
                      </h3>

                      {(tag.ownerFirstName || tag.ownerLastName) ? (
                        <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                          {tag.ownerFirstName} {tag.ownerLastName}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-slate-400 italic">
                          {t.noOwnerName}
                        </p>
                      )}
                    </div>

                    {!selectionMode && (
                      <div className="mt-auto flex border-t border-slate-100 divide-x divide-slate-100 bg-slate-50">
                        <Link
                          href={`/${tag.tagId}`}
                          className="flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
                        >
                          {t.view} <ArrowRight className="h-3 w-3" />
                        </Link>
                        <Link
                          href={`/${tag.tagId}/edit`}
                          className="flex-1 py-3 text-center text-sm font-medium text-slate-600 hover:bg-white hover:text-blue-600 transition-colors"
                        >
                          {t.edit}
                        </Link>
                      </div>
                    )}

                    {selectionMode && isSelected && (
                      <div className="border-t border-blue-200 bg-blue-50 px-6 py-2 text-xs font-medium text-blue-600 text-center">
                        ✓ Ausgewählt
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
