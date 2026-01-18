'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../components/LanguageProvider';
import { messages } from '@/lib/i18n';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { QrCode, Loader2, ArrowRight } from 'lucide-react';
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
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Translations for the dashboard
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
            headers: {
                'Authorization': `Bearer ${token}`
            }
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
              {tags.map((tag) => (
                <div 
                    key={tag.tagId} 
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="p-6 flex-grow">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-full bg-blue-50 p-2.5 text-blue-600 group-hover:bg-blue-100 transition-colors">
                            <QrCode className="h-5 w-5" />
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
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
