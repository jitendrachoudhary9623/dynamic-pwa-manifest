'use client';

import InstallPWA from '@/components/InstallPWA';
import { useEffect } from 'react';

export default function StoreContent({ storeName }: { storeName: string }) {
  useEffect(() => {
    // This effect ensures the manifest is updated when the component mounts or storeName changes
    const linkElement = document.querySelector('link[rel="manifest"]');
    if (linkElement) {
      linkElement.setAttribute('href', `/api/manifest/${storeName}`);
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'manifest';
      newLink.href = `/api/manifest/${storeName}`;
      document.head.appendChild(newLink);
    }
  }, [storeName]);

  return (
    <div>
      <h1>Welcome to {storeName} Store</h1>
      <InstallPWA storeName={storeName} />
      {/* Rest of your store content */}
    </div>
  );
}