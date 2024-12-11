'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Star, Sparkle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HomePageForm } from './_form';
import { HomePageTestimonials } from './_testimonials';
import { HomePageFeatures } from './_features';

function Badge(opts: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-full border border-black px-3 py-1 bg-primary/90 flex items-center whitespace-nowrap text-black uppercase font-medium font-dm-sans',
        opts.className
      )}
    >
      {opts.children}
    </div>
  );
}

function Sparkles() {
  return (
    <>
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[10%] right-[15%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[20%] left-[12%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[35%] right-[8%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[55%] left-[25%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[60%] right-[18%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[28%] left-[38%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[42%] right-[33%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[65%] left-[15%] opacity-70 -z-1" />
      <Sparkle className="w-5 h-5 text-gray-800 absolute bottom-[75%] right-[22%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[48%] left-[42%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[10%] right-[15%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[20%] left-[12%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[35%] right-[8%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[32%] right-[10%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute bottom-[20%] left-[6%] opacity-70 -z-1" />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[45%] left-[18%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[40%] right-[20%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[15%] right-[25%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[25%] left-[22%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[8%] left-[30%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[15%] right-[28%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[38%] left-[8%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[45%] left-[35%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[25%] right-[32%] opacity-70 -z-1" />
      <Sparkle className="w-5 h-5 text-gray-800 absolute top-[50%] right-[40%] opacity-70 -z-1" />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[30%] left-[40%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[8%] left-[45%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute bottom-[50%] right-[45%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle
        className="w-5 h-5 text-gray-800 absolute top-[42%] left-[48%] opacity-70 -z-1"
        fill="currentColor"
      />
      <Sparkle className="w-5 h-5 text-gray-800 absolute bottom-[18%] right-[15%] opacity-70 -z-1" />
    </>
  );
}

function FiveStars() {
  return (
    <span className="inline-flex items-center -space-x-2.5">
      <Star className="h-3" fill="currentColor" />
      <Star className="h-3" fill="currentColor" />
      <Star className="h-3" fill="currentColor" />
      <Star className="h-3" fill="currentColor" />
      <Star className="h-3" fill="currentColor" />
    </span>
  );
}

export default function HomePage() {
  const t = useTranslations('landing');
  const formContainerRef = React.useRef<HTMLDivElement>(null);
  const testimonialsContainerRef = React.useRef<HTMLDivElement>(null);

  const _scrollToForm = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const _scrollToTestimonials = () => {
    if (testimonialsContainerRef.current) {
      testimonialsContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen container max-w-screen-sm mx-auto">
      <div
        className="bg-black text-white p-4 w-full flex flex-col items-center"
        onClick={_scrollToForm}
      >
        <div className="container text-center text-sm">{t('promoHeader')}</div>
      </div>
      <div className="w-full">
        <div className="relative flex flex-col items-center pt-4">
          <Sparkles />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex justify-center my-4">
              <Image src="/images/logo-white.svg" alt="Edwix" width={200} height={100} />
            </div>
            <div className="flex justify-center">
              <Badge>{t('mainBadge')}</Badge>
            </div>

            <h2 className="text-2xl mx-6 text-center font-medium">
              <strong className="text-primary font-medium font-dm-sans">
                {t('mainTitle.prefix')}
              </strong>{' '}
              {t('mainTitle.content')}
            </h2>

            <div className="flex items-center gap-3 py-4">
              <Button
                size="lg"
                className="rounded-full uppercase font-bold border-2 border-black text-black h-12 shadow-plain hover:shadow-none transition-all font-dm-sans"
                onClick={_scrollToTestimonials}
              >
                {t('buttons.caseStudies')}
              </Button>
              <Button
                size="lg"
                className="rounded-full uppercase font-bold border-2 border-black text-black h-12 shadow-plain bg-white hover:bg-foreground hover:shadow-none transition-all font-dm-sans"
                onClick={_scrollToForm}
              >
                {t('buttons.getFreeYear')}
              </Button>
            </div>

            <div className="flex flex-col items-center pb-10">
              <div className="w-full max-w-lg px-8 -mb-1">
                <Image
                  src="/images/hero-illustration2.svg"
                  alt="Edwix"
                  className=""
                  width={500}
                  height={100}
                />
              </div>

              <div ref={formContainerRef} className="px-4 md:px-8">
                <HomePageForm />
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 bg-foreground flex flex-col gap-4">
          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <Badge>
                {t('rating.prefix')}
                <FiveStars />
                {t('rating.suffix')}
              </Badge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              <strong className="font-medium text-primary font-dm-sans">{t('users.prefix')}</strong>{' '}
              {t('users.content')}
            </h2>

            <div ref={testimonialsContainerRef}>
              <HomePageTestimonials />
            </div>
          </div>

          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <Badge>{t('features.badge')}</Badge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              {t('features.title.prefix')}{' '}
              <strong className="font-medium text-primary font-dm-sans">
                {t('features.title.highlight')}
              </strong>{' '}
              {t('features.title.suffix')}
            </h2>

            <HomePageFeatures />
          </div>
        </div>
      </div>
    </main>
  );
}
