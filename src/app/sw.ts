// app/sw.ts
import type { PrecacheEntry } from '@serwist/precaching';
import { installSerwist } from '@serwist/sw';

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

self.addEventListener('install', (event) => {
  const urlParams = new URLSearchParams(location.search);
  const storeName = urlParams.get('store');
  
  const scope = storeName ? `/store/${storeName}` : '/';

  event.waitUntil(
    (async () => {
      const serwistConfig = {
        precacheEntries: self.__SW_MANIFEST,
        skipWaiting: true,
        clientsClaim: true,
        navigationPreload: true,
        scope: scope,
      };

      await installSerwist(serwistConfig);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/store/')) {
    event.respondWith(
      fetch(event.request).catch(() => 
        caches.match('/offline.html').then(response => 
          response || new Response('Offline content unavailable', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          })
        )
      )
    );
  }
});