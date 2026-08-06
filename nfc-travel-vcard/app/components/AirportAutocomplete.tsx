'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AirportOption {
  iata: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

interface AirportAutocompleteProps {
  value: string;
  onChange: (code: string) => void;
  onSelect: (airport: AirportOption) => void;
  placeholder?: string;
  className?: string;
}

let cachedAirports: AirportOption[] | null = null;
let loadingPromise: Promise<AirportOption[]> | null = null;

async function loadAirports(): Promise<AirportOption[]> {
  if (cachedAirports) return cachedAirports;
  if (!loadingPromise) {
    loadingPromise = fetch('/airports.json').then(r => r.json()).then(data => {
      cachedAirports = data;
      return data;
    });
  }
  return loadingPromise;
}

function filterAirports(query: string, airports: AirportOption[]): AirportOption[] {
  const q = query.toLowerCase();
  const byCode = airports.filter(a => a.iata.toLowerCase().startsWith(q));
  const byName = airports.filter(a => !a.iata.toLowerCase().startsWith(q) && a.name.toLowerCase().includes(q));
  const byCity = airports.filter(a => !a.iata.toLowerCase().startsWith(q) && !a.name.toLowerCase().includes(q) && a.city.toLowerCase().includes(q));
  return [...byCode, ...byName, ...byCity].slice(0, 8);
}

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({ value, onChange, onSelect, placeholder = 'FRA', className }) => {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<AirportOption[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [airports, setAirports] = useState<AirportOption[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = async () => {
    if (!airports) {
      const data = await loadAirports();
      setAirports(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    if (airports && val.length >= 1) {
      setOptions(filterAirports(val, airports));
      setOpen(true);
      setActiveIdx(-1);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (airport: AirportOption) => {
    setQuery(airport.iata);
    setOpen(false);
    onChange(airport.iata);
    onSelect(airport);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, options.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && activeIdx >= 0) { e.preventDefault(); handleSelect(options[activeIdx]); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  const inputCls = className || 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none';

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={4}
        autoComplete="off"
        className={inputCls}
      />
      {open && options.length > 0 && (
        <ul className="absolute z-50 mt-1 w-72 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden text-sm">
          {options.map((a, idx) => (
            <li
              key={a.iata}
              onMouseDown={() => handleSelect(a)}
              className={`px-3 py-2 cursor-pointer ${idx === activeIdx ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
            >
              <span className="font-semibold text-slate-900">{a.iata}</span>
              <span className="text-slate-500"> — {a.name}</span>
              {a.city && <span className="text-slate-400"> ({a.city}, {a.country})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportAutocomplete;
export type { AirportOption };
