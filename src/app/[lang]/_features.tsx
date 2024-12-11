import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Calendar } from 'lucide-react';

type FeatureItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function HomePageFeatures() {
  const t = useTranslations('landing');
  const features: FeatureItem[] = [
    {
      icon: <DollarSign />,
      title: t('features.expenseTracker.title'),
      description: t('features.expenseTracker.description'),
    },
    {
      icon: <Bell />,
      title: t('features.alerts.title'),
      description: t('features.alerts.description'),
    },
    {
      icon: <Mail />,
      title: t('features.goEmail.title'),
      description: t('features.goEmail.description'),
    },
    {
      icon: <Lock />,
      title: t('features.vault.title'),
      description: t('features.vault.description'),
    },
    {
      icon: <Calendar />,
      title: t('features.calendar.title'),
      description: t('features.calendar.description'),
    },
  ];

  return (
    <div className="text-center p-4 bg-foreground flex flex-col gap-4">
      {features.map(feature => (
        <Card key={feature.title} className="p-4 border-2 border-black shadow-none font-dm-sans">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shrink-0">
              {feature.icon}
            </div>
            <div className="w-full text-left">
              <h3 className="text-2xl font-medium">{feature.title}</h3>
              <p className="text-sm">{feature.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
