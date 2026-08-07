'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AirlineOption {
  iata: string;
  name: string;
  country: string;
}

interface AirlineAutocompleteProps {
  value: string;
  onChange: (name: string) => void;
  onSelect: (airline: AirlineOption) => void;
  placeholder?: string;
  className?: string;
}

let cachedAirlines: AirlineOption[] | null = null;
let loadingPromise: Promise<AirlineOption[]> | null = null;

export async function loadAirlines(): Promise<AirlineOption[]> {
  if (cachedAirlines) return cachedAirlines;
  if (!loadingPromise) {
    loadingPromise = fetch('/airlines.json').then(r => r.json()).then(data => {
      cachedAirlines = data;
      return data;
    });
  }
  return loadingPromise;
}

function filterAirlines(query: string, airlines: AirlineOption[]): AirlineOption[] {
  const q = query.toLowerCase();
  const byCode = airlines.filter(a => a.iata.toLowerCase().startsWith(q));
  const byName = airlines.filter(
    a => !a.iata.toLowerCase().startsWith(q) && a.name.toLowerCase().includes(q)
  );
  return [...byCode, ...byName].slice(0, 8);
}

const AirlineAutocomplete: React.FC<AirlineAutocompleteProps> = ({ value, onChange, onSelect, placeholder = 'Lufthansa', className }) => {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<AirlineOption[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [airlines, setAirlines] = useState<AirlineOption[] | null>(null);
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
    if (!airlines) {
      const data = await loadAirlines();
      setAirlines(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    if (airlines && val.length >= 1) {
      setOptions(filterAirlines(val, airlines));
      setOpen(true);
      setActiveIdx(-1);
    } else {
      setOpen(false);
    }
  };

  const handleSelect = (airline: AirlineOption) => {
    setQuery(airline.name);
    setOpen(false);
    onChange(airline.name);
    onSelect(airline);
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
              {a.country && <span className="text-slate-400"> ({a.country})</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirlineAutocomplete;
export type { AirlineOption };
