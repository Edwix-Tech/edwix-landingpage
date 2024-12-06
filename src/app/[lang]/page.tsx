'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { register } from '@/lib/api/mutations';
import type { RegisterPayload } from '@/lib/api/mutations';
import { env } from '@/lib/env';
import mustache from 'mustache';
import { Bell, DollarSign, Mail, Lock, Calendar, Star, Sparkle, Check, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const formSchema = (t: (key: string) => string) =>
  z.object({
    firstname: z.string().min(1, t('validation.firstname.required')),
    lastname: z.string().min(1, t('validation.lastname.required')),
    email: z.string().email(t('validation.email.invalid')),
    password: z.string(),
    confirmPassword: z
      .string()
      .min(6, t('validation.password.minLength'))
      .regex(/[0-9]/, t('validation.password.requireNumber'))
      .regex(/[a-zA-Z]/, t('validation.password.requireLetter')),
    promoCode: z.string().min(1, t('validation.promoCode.required')),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

function PasswordRequirements({ password }: { password: string }) {
  const t = useTranslations('landing');
  const hasMinLength = password.length >= 6;
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  const requirementStyle = (met: boolean) =>
    cn('flex items-center gap-2 text-xs', met ? 'text-primary' : 'text-red-600');

  const iconCheck = <Check className="w-4 h-4" />;
  const iconX = <X className="w-4 h-4" />;

  return (
    <div className="flex w-full justify-center gap-4 px-2 mt-1 font-medium">
      <div className={requirementStyle(hasMinLength)}>
        {hasMinLength ? iconCheck : iconX} {t('validation.passwordRequirements.minLength')}
      </div>
      <div className={requirementStyle(hasNumber)}>
        {hasNumber ? iconCheck : iconX} {t('validation.passwordRequirements.number')}
      </div>
      <div className={requirementStyle(hasLetter)}>
        {hasLetter ? iconCheck : iconX} {t('validation.passwordRequirements.letter')}
      </div>
    </div>
  );
}

function HomePageForm() {
  const { toast } = useToast();
  const t = useTranslations('landing');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      promoCode: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
    onSuccess: data => {
      toast({
        title: 'Success',
        description: 'Registration successful',
      });

      const redirectUrl = new URL(mustache.render(env().REDIRECT_URL, { token: data.accessToken }));
      window.location.href = redirectUrl.toString();
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Error',
        description: t('validation.password.mismatch'),
        variant: 'destructive',
      });
      return;
    }

    registerMutation.mutate(data);
  };

  const renderFieldText = (opts: {
    name: keyof FormValues;
    hideLabel?: boolean;
    hideMessage?: boolean;
  }) => (
    <FormField
      control={form.control}
      name={opts.name}
      render={({ field }) => (
        <FormItem className="font-hanken-grotesk">
          {!opts.hideLabel && (
            <FormLabel className="font-bold">{t(`form.fields.${opts.name}.label`)}</FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={t(`form.fields.${opts.name}.placeholder`)}
              {...field}
              className="bg-white border-2 border-black rounded-full h-10 text-sm"
              type={opts.name.includes('password') ? 'password' : 'text'}
            />
          </FormControl>
          {opts.name === 'confirmPassword' && (
            <PasswordRequirements password={form.watch('password')} />
          )}
          {!opts.hideMessage && <FormMessage className="font-medium text-center text-red-600" />}
        </FormItem>
      )}
    />
  );

  return (
    <Card className="p-6 bg-foreground border-2 border-black shadow-plain-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderFieldText({
            name: 'firstname',
          })}

          {renderFieldText({
            name: 'lastname',
          })}

          {renderFieldText({
            name: 'email',
          })}

          {renderFieldText({
            name: 'password',
            hideMessage: true,
          })}

          {renderFieldText({
            name: 'confirmPassword',
            hideLabel: true,
            hideMessage: true,
          })}

          {renderFieldText({
            name: 'promoCode',
          })}

          <div className="h-2" />

          <Button
            size="lg"
            type="submit"
            className="w-full uppercase rounded-full border-2 border-black text-inverse font-bold font-hanken-grotesk shadow-plain hover:shadow-none transition-all"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? t('form.submit.loading') : t('form.submit.default')}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

type FeatureItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function HomePageFeatures() {
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
        <Card key={feature.title} className="p-4 border border-black shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white shrink-0">
              {feature.icon}
            </div>
            <div className="w-full text-left">
              <h3 className="text-2xl font-medium">{feature.title}</h3>
              <p className="text-sm font-hanken-grotesk">{feature.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

type TestimonialItem = {
  name: string;
  city: string;
  since: Date;
  quote: string;
  imagePath: string;
  explanation: string;
};

function HomePageTestimonials() {
  const t = useTranslations('landing');
  const testimonials: TestimonialItem[] = [
    {
      name: 'Nathalie',
      city: 'Québec',
      since: new Date('2023-01-01'),
      quote: t('testimonials.nathalie.quote'),
      imagePath: '/images/testimonials/1.jpg',
      explanation: t('testimonials.nathalie.explanation'),
    },
    {
      name: 'Christian',
      city: 'Laval',
      since: new Date('2023-01-01'),
      quote: t('testimonials.christian.quote'),
      imagePath: '/images/testimonials/2.jpg',
      explanation: t('testimonials.christian.explanation'),
    },
  ];

  return (
    <div className="p-4 bg-foreground flex flex-col gap-4">
      {testimonials.map(testimonial => (
        <Card key={testimonial.name} className="flex flex-col gap-4 p-6 py-10 border border-black">
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={testimonial.imagePath}
              alt={testimonial.name}
              width={100}
              height={100}
              className="object-cover h-16 w-16 rounded-full border border-black"
            />
            <div className="flex flex-col items-center">
              <h3 className="text-xs font-medium font-hanken-grotesk">
                {testimonial.name}, {testimonial.city}
              </h3>
              <p className="text-xs font-hanken-grotesk">
                {t('testimonials.userSince', { date: testimonial.since.toLocaleDateString() })}
              </p>
            </div>
          </div>
          <p className="text-xl text-center font-medium">
            &ldquo;{`  ${testimonial.quote}  `}&rdquo;
          </p>
          <p className="text-xs font-hanken-grotesk text-muted-foreground">
            *{testimonial.explanation}
          </p>
        </Card>
      ))}
    </div>
  );
}

function HomePageBadge(opts: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-md bg-blue-50 border border-primary/80 font-hanken-grotesk px-3 py-1 bg-primary/20 flex items-center whitespace-nowrap text-sm',
        opts.className
      )}
    >
      {opts.children}
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('landing');
  const formContainerRef = React.useRef<HTMLDivElement>(null);

  const _scrollToForm = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen container max-w-screen-sm mx-auto">
      <div
        className="bg-black text-white p-4 w-full flex flex-col items-center"
        onClick={_scrollToForm}
      >
        <div className="container text-center font-hanken-grotesk text-sm">{t('promoHeader')}</div>
      </div>
      <div className="w-full">
        <div className="relative flex flex-col items-center pt-4">
          <Sparkle
            className="w-12 h-12 text-gray-800 absolute top-[10%] right-[15%] opacity-70 -z-1"
            fill="currentColor"
          />
          <Sparkle
            className="w-12 h-12 text-gray-800 absolute top-[20%] left-[12%] opacity-70 -z-1"
            fill="currentColor"
          />
          <Sparkle
            className="w-12 h-12 text-gray-800 absolute bottom-[35%] right-[8%] opacity-70 -z-1"
            fill="currentColor"
          />
          <Sparkle className="w-12 h-12 text-gray-800 absolute top-[32%] right-[10%] opacity-70 -z-1" />
          <Sparkle className="w-12 h-12 text-gray-800 absolute bottom-[20%] left-[6%] opacity-70 -z-1" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex justify-center my-4">
              <Image src="/images/logo-white.svg" alt="Edwix" width={200} height={100} />
            </div>
            <div className="flex justify-center">
              <HomePageBadge>{t('mainBadge')}</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center font-medium">
              <strong className="font-medium text-primary">{t('mainTitle.prefix')}</strong>{' '}
              {t('mainTitle.content')}
            </h2>

            <div className="flex items-center gap-3 py-4">
              <Link href="#case-studies">
                <Button
                  size="lg"
                  className="rounded-full font-hanken-grotesk border-2 border-black text-black h-12 shadow-plain hover:shadow-none transition-all"
                >
                  {t('buttons.caseStudies')}
                </Button>
              </Link>
              <Button
                size="lg"
                className="rounded-full font-hanken-grotesk border-2 border-black text-black h-12 shadow-plain bg-white hover:bg-foreground hover:shadow-none transition-all"
                onClick={_scrollToForm}
              >
                {t('buttons.getFreeYear')}
              </Button>
            </div>

            <div className="w-full max-w-md px-8">
              <Image
                src="/images/hero-illustration.svg"
                alt="Edwix"
                className=""
                width={500}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className="py-4 bg-foreground flex flex-col gap-4">
          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <HomePageBadge className="text-black">
                {t('rating.prefix')}
                <span className="inline-flex items-center -space-x-2.5">
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                </span>
                {t('rating.suffix')}
              </HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              <strong className="font-medium text-primary">{t('users.prefix')}</strong>{' '}
              {t('users.content')}
            </h2>

            <HomePageTestimonials />
          </div>

          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <HomePageBadge className="text-black">{t('features.badge')}</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              {t('features.title.prefix')}{' '}
              <strong className="font-medium text-primary">{t('features.title.highlight')}</strong>{' '}
              {t('features.title.suffix')}
            </h2>

            <HomePageFeatures />
          </div>
        </div>

        <div className="p-4 py-8 flex flex-col relative" ref={formContainerRef}>
          <Sparkle
            className="w-12 h-12 text-gray-800 absolute top-[12%] right-[15%] opacity-70 -z-1"
            fill="currentColor"
          />
          <Sparkle
            className="w-12 h-12 text-gray-800 absolute top-[20%] left-[12%] opacity-70 -z-1"
            fill="currentColor"
          />
          <Sparkle className="w-12 h-12 text-gray-800 absolute bottom-[2.5%] right-[25%] opacity-70 -z-1" />
          <Sparkle className="w-12 h-12 text-gray-800 absolute bottom-[1%] left-[2%] opacity-70 -z-1" />

          <div className="flex flex-col gap-4 z-10">
            <div className="flex justify-center">
              <HomePageBadge>{t('form.badge')}</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center font-medium">
              <strong className="font-medium text-primary">{t('form.title.prefix')}</strong>{' '}
              {t('form.title.content')}
            </h2>

            <div className="p-4">
              <HomePageForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
