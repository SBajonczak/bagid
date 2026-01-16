'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { messages } from '@/lib/i18n';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import Image from "next/image";
import LanguageSwitcher from './LanguageSwitcher';

const NavigationBar: React.FC = () => {
    const { language } = useLanguage();
    const { isAuthenticated, user, login, logout } = useAuth();

    const t1 = messages[language].common;
    const t2 = messages[language].noDataSection;

    const [loading, setLoading] = useState(false);

    // Handle login button click
    const handleLogin = async () => {
        try {
            setLoading(true);
            login();
        } catch (error) {
            console.error("NavigationBar: Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle logout button click
    const handleLogout = async () => {
        try {
            logout();
        } catch (error) {
            console.error("NavigationBar: Logout error:", error);
        }
    };


    return (
        <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur shadow-md py-4 px-6 flex justify-between items-center">
            {/* Logo + Language Switcher */}
            <div className="flex gap-3 items-center">
                {/* Add more flags as needed */}
                <Link
                    href="/"
                    className="font-extrabold text-blue-800 tracking-wide drop-shadow-sm flex items-center text-[1.25rem] md:text-2xl hover:text-blue-600 transition-colors"
                    aria-label="Zur Startseite"
                >
                    <Image
  src="/assets/icon_32_32.png"
  alt="Bag-Tag Logo"
  width={32}
  height={32}
  className="inline-block mr-2 align-middle flex-shrink-0"
/>
                    <span className="hidden md:inline md:text-3xl whitespace-nowrap">
                        {t1.productname}
                    </span>
                    <span className="inline md:hidden text-[1rem] whitespace-nowrap">
                        {t1.productname}
                    </span>
                </Link>
                <LanguageSwitcher />
            </div>
            <div className="flex-1 flex justify-center">
                <span className="font-bold px-4 py-2  text-md md:text-base text-center">

                </span>
            </div>
            <ul className="hidden md:flex gap-4 ml-auto">
                <li><a href="#features" className="text-blue-700 font-bold hover:underline">{t1.features}</a></li>
                <li><a href="#faq" className="text-blue-700 font-bold hover:underline">{t1.faq}</a></li>
            </ul>

            <div className="flex items-center pl-2 gap-2">
                {/* High-conversion "Buy Now" button */}
                <a
                    href="https://kreativschicht.de/cart/50710421668182:1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    aria-label="Jetzt kaufen"
                >
                    {t2.cta}
                </a>

                {/* User authentication button */}
                {loading ? (
                    <div className="w-8 h-8 flex items-center justify-center" role="status" aria-label="Lädt">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : isAuthenticated ? (


                    <button
                        onClick={handleLogout}
                        className="text-blue-700 flex items-center gap-1 ml-2"
                        title={t1.logout || "Logout"}
                        aria-label={`Abmelden als ${user?.email || user?.username}`}
                        disabled={loading}
                    >
                        <FaUserCircle className="text-2xl" aria-hidden="true" />
                        <span className="hidden md:inline font-bold">{user?.email || user?.username || t1.dashboard}</span>
                    </button>

                ) : (
                    <button
                        onClick={handleLogin}
                        className="text-blue-700 flex items-center gap-1 ml-2"
                        title={t1.login || "Login"}
                        aria-label="Anmelden"
                        disabled={loading}
                    >
                        <FaUser className="text-2xl" aria-hidden="true" />
                        <span className="hidden md:inline font-bold">{t1.login}</span>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
