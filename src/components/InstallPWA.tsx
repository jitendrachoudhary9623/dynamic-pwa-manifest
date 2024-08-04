'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Download, Check, AlertTriangle } from 'lucide-react';

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

  if (installState === 'installed' || installState === 'unsupported')
    return null;

  return (
    <Card className="w-full max-w-sm mx-auto bg-gray-800 text-white border-gray-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl text-purple-400">Install {storeName} App</CardTitle>
        <CardDescription className="text-gray-400 text-sm">Quick access from your home screen</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {installState === 'unsupported' && (
          <Alert variant="destructive" className="bg-red-900 border-red-700">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Not Supported</AlertTitle>
            <AlertDescription className="text-sm">
              PWA installation is not supported here.
            </AlertDescription>
          </Alert>
        )}
        {installState === 'installed' && (
          <Alert className="bg-green-900 border-green-700">
            <Check className="h-4 w-4" />
            <AlertTitle>Installed</AlertTitle>
            <AlertDescription className="text-sm">
              The {storeName} App is already installed.
            </AlertDescription>
          </Alert>
        )}
        {installState === 'supported' && (
          <div className="text-sm space-y-2">
            <p>Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Quick home screen access</li>
              <li>Offline shopping capabilities</li>
              <li>Order & deal notifications</li>
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onClick}
          disabled={installState !== 'supported'}
        >
          {installState === 'supported' ? (
            <>
              <Download className="mr-2 h-4 w-4" /> Install Now
            </>
          ) : installState === 'installed' ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Installed
            </>
          ) : (
            'Not Available'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}