import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-violet-50 text-black border p-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
