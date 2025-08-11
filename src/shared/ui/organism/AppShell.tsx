import React from 'react';

type Props = {
  children: React.ReactNode;
  stars?: boolean; // вмикає напівпрозорий шар зірок
};

export function AppShell({ children, stars = true }: Props) {
  return (
    <div className="min-h-dvh w-full app-gradient flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-[420px] rounded-3xl border border-white/10
                      bg-white/5 shadow-2xl overflow-hidden backdrop-blur">
        {stars && <div className="pointer-events-none absolute inset-0 star-overlay" />}
        {children}
      </div>
    </div>
  );
}
