'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DynamicManifest() {
  const pathname = usePathname();
  const [storeName, setStoreName] = useState<string | null>(null);

  useEffect(() => {
    const storeMatch = pathname.match(/^\/store\/([^\/]+)/);
    const newStoreName = storeMatch ? storeMatch[1] : null;
    setStoreName(newStoreName);

    const linkElement = document.querySelector('link[rel="manifest"]');

    if (linkElement) {
      linkElement.setAttribute('href', newStoreName ? `/api/manifest/${newStoreName}` : '/api/manifest/default');
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'manifest';
      newLink.href = newStoreName ? `/api/manifest/${newStoreName}` : '/api/manifest/default';
      document.head.appendChild(newLink);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
}