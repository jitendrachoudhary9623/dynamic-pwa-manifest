'use client';

import { useState, useEffect } from 'react';

export default function InstallPWA({ storeName }: { storeName: string }) {
  const [installState, setInstallState] = useState<'unsupported' | 'supported' | 'installed'>('unsupported');
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallState('supported');
      setPromptInstall(e);
    };
    
    window.addEventListener('beforeinstallprompt', handler);

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstallState('installed');
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    const choiceResult = await promptInstall.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log(`User accepted the install prompt for ${storeName} store`);
      setInstallState('installed');
    } else {
      console.log(`User dismissed the install prompt for ${storeName} store`);
    }
  };

  const registerServiceWorker = async (storeName: string) => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(`/sw.js?store=${storeName}`, {
          scope: `/store/${storeName}`
        });
        console.log('Service worker registered successfully', registration);

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New version available. Refresh to update.');
              }
            });
          }
        });
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }
  };

  useEffect(() => {
    registerServiceWorker(storeName);
  }, [storeName]);

  if (installState === 'unsupported') {
    return <p>PWA installation is not supported in this environment.</p>;
  }

  if (installState === 'installed') {
    return <p>The {storeName} Store App is already installed.</p>;
  }

  return (
    <button
      className="install-button"
      onClick={onClick}
      disabled={!promptInstall}
    >
      Install {storeName} Store App
    </button>
  );
}