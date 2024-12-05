'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { SettingsModal } from '@/components/settings-modal';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const t = useTranslations('home');
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 px-4 py-2">
        <div className="flex-1 container mx-auto">
          <div className="container py-8">
            <div className="flex flex-col gap-1">
              <h1 className="relative text-3xl font-bold tracking-tighter sm:text-4xl">
                <span>
                  {t('welcome', {
                    email: 'john.doe@example.com',
                  })}
                </span>
              </h1>
              <p className="text-muted-foreground">{t('description')}</p>

              <Button onClick={() => setShowSettings(true)}>Settings</Button>

              <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
