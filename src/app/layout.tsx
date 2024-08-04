"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicManifest from './DynamicManifest';
import { useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => console.log('Service Worker registered with scope:', registration.scope))
        .catch((error) => console.error('Service Worker registration failed:', error));
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicManifest />
        {children}
      </body>
    </html>
  );
}