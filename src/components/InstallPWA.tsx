'use client';

import { useState, useEffect } from 'react';

export default function InstallPWA({ storeName }: { storeName: string }) {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

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
    } else {
      console.log(`User dismissed the install prompt for ${storeName} store`);
    }
  };

  // This piece we need to figure out
//   if (!supportsPWA) {
//     return null;
//   }

  return (
    <button
      className="install-button"
      onClick={onClick}
    >
      Install {storeName} Store App
    </button>
  );
}