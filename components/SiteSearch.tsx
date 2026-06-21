'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchSite, type SearchEntry } from '@/lib/search-index';

const GREEN = '#4F7256';
const TAUPE = '#6F6456';

export default function SiteSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [results, setResults] = useState<SearchEntry[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    setResults(searchSite(query));
    setActive(0);
  }, [query]);

  // Close on outside click.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const go = (entry?: SearchEntry) => {
    const target = entry ?? results[active] ?? results[0];
    if (!target) return;
    setOpen(false);
    setQuery('');
    router.push(target.url);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showPanel = open && query.trim().length >= 2;

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-label="Search the site"
          placeholder="WHAT ARE YOU LOOKING FOR?"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="w-full bg-white placeholder:text-[#4F7256]"
          style={{ border: `1px solid ${GREEN}`, borderRadius: '999px', padding: '16px 52px 16px 20px', color: GREEN, fontFamily: 'Roboto, sans-serif', fontSize: '13px', letterSpacing: '2px' }}
        />
        <button
          type="button"
          aria-label="Search"
          onClick={() => go()}
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 6, lineHeight: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {showPanel && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 z-50"
          style={{
            top: 'calc(100% + 8px)',
            background: '#fff',
            border: '1px solid rgba(79,114,86,0.18)',
            borderRadius: '16px',
            boxShadow: '0 18px 44px rgba(40,55,44,0.18)',
            overflow: 'hidden',
            maxHeight: '340px',
            overflowY: 'auto',
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: '16px 20px', fontFamily: 'Roboto, sans-serif', fontSize: '13px', color: TAUPE }}>
              No matches. Try <strong>GLP-1</strong>, <strong>fat freezing</strong>, <strong>prices</strong> or <strong>book</strong>.
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.url}
                role="option"
                aria-selected={i === active}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className="w-full text-left block"
                style={{
                  padding: '12px 20px',
                  background: i === active ? 'rgba(79,114,86,0.08)' : 'transparent',
                  border: 'none',
                  borderBottom: i < results.length - 1 ? '1px solid rgba(79,114,86,0.08)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ display: 'block', color: GREEN, fontFamily: '"Novecento Wide Book", sans-serif', fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {r.title}
                </span>
                <span style={{ display: 'block', color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: '12.5px', lineHeight: 1.4, marginTop: 3 }}>
                  {r.description}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
