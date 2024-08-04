// sw.ts

import type { PrecacheEntry } from '@serwist/precaching';
import { installSerwist } from '@serwist/sw';

declare const self: WorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
});