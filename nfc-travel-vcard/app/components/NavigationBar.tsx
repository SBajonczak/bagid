'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Menu, X,  LogOut, LogIn, LayoutDashboard, ShoppingBag, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { useAuth } from './AuthProvider';
import { messages } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

const NavigationBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { isAuthenticated, login, logout } = useAuth();
  const pathname = usePathname();
  const t = messages[language].common;
  const t2 = messages[language].noDataSection;

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
      try {
          setLoading(true);
          await login();
      } catch (error) {
          console.error("Login error", error);
      } finally {
          setLoading(false);
      }
  };

  const handleLogout = async () => {
      await logout();
      setIsMobileMenuOpen(false);
  };

  const menuItems = [
    ...(isAuthenticated ? [{ 
        href: '/dashboard', 
        label: t.myTags,
        icon: LayoutDashboard 
    }] : []),
    {
        href: '/#features',
        label: t.features,
        icon: null
    },
    {
        href: '/#faq',
        label: t.faq,
        icon: null
    }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Zur Startseite">
                <Image
                    src="/assets/icon_32_32.png"
                    alt="Bag-Tag Logo"
                    width={32}
                    height={32}
                    className="flex-shrink-0 transition-transform group-hover:scale-105"
                />
               <span className="hidden md:flex flex-col leading-none">
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                        {t.productname}
                    </span>
               </span>
               <span className="md:hidden text-lg font-bold text-slate-900">
                  Bag-Tag
               </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`group flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                            isActive 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                    >
                        {item.icon && <item.icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />}
                        {item.label}
                    </Link>
                );
            })}

            <div className="h-6 w-px bg-slate-200 mx-2" />
            
            <a
                href="https://kreativschicht.de/products/bagid-koffer-tag-mit-nfc?utm_source=bag-tag&utm_medium=hero&utm_campaign=landing"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 bg-green-600/90 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:bg-green-600 hover:shadow transition-all"
            >
                <ShoppingBag className="h-4 w-4" />
                {t2.cta}
            </a>

            <LanguageSwitcher />

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 pl-2">
                {loading ? (
                     <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                ) : isAuthenticated ? (
                    <button 
                        onClick={handleLogout}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title={t.logout}
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                ) : (
                    <button 
                        onClick={handleLogin}
                        className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-slate-50"
                    >
                        <LogIn className="h-4 w-4" />
                        {t.login}
                    </button>
                )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
             <LanguageSwitcher />
             
             <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 border-t border-slate-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white px-4 py-4 space-y-1 shadow-inner">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                 {item.icon ? <item.icon className="h-5 w-5 text-slate-400" /> : <div className="w-5" />}
                {item.label}
              </Link>
            ))}
            
            <div className="my-2 h-px bg-slate-100" />
            
            <a
                href="https://kreativschicht.de/cart/50710421668182:1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-green-500 text-white font-bold px-4 py-3 rounded-xl shadow-sm hover:bg-green-600 transition"
            >
                <ShoppingBag className="h-5 w-5" />
                {t2.cta}
            </a>

             {!isAuthenticated && (
                <div className="pt-2">
                    <button 
                        onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                    >
                         <LogIn className="h-4 w-4" />
                         {t.login}
                    </button>
                </div>
            )}
            
            {isAuthenticated && (
                <div className="pt-2">
                     <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="h-5 w-5" />
                        {t.logout}
                    </button>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
