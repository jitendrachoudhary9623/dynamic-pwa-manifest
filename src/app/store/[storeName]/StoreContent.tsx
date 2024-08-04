'use client';

import InstallPWA from '@/components/InstallPWA';
import { useEffect } from 'react';

export default function StoreContent({ storeName }: { storeName: string }) {
  useEffect(() => {
    // This effect ensures the manifest is updated when the component mounts or storeName changes
    // Dynamically set the manifest for this store
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = `/api/manifest?storeName=${storeName}`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [storeName]);

  return (
    <div>
      <h1>Welcome to {storeName} Store</h1>
      <InstallPWA storeName={storeName} />
      {/* Rest of your store content */}
    </div>
  );
}