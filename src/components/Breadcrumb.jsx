"use client";
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  // items = [{ label: 'Home', href: '/' }, { label: 'Collections' }]
  return (
    <nav className="flex items-center gap-2 mb-12 animate__animated animate__fadeIn flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-brand-gold transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-gold whitespace-nowrap">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
