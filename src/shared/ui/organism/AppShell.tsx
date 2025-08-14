import React from 'react';
import './AppShell.css';
import BgImage from '/Bg.png'

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center p-3 sm:p-4"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-full max-w-[420px] rounded-3xl border border-white/10
                      bg-white/5 shadow-2xl overflow-hidden backdrop-blur">
        {children}
      </div>
    </div>
  );
}