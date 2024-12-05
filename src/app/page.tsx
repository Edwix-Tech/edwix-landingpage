'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

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
import { Bell, DollarSign, Mail, Lock, Calendar, Star, Sparkle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const formSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  promoCode: z.string().min(1, 'Promo code is required'),
});

type FormValues = z.infer<typeof formSchema>;

function HomePageForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
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
    registerMutation.mutate(data);
  };

  const renderFieldText = (opts: {
    label: string;
    placeholder: string;
    name: keyof FormValues;
  }) => (
    <FormField
      control={form.control}
      name={opts.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">{opts.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={opts.placeholder}
              {...field}
              className="bg-white border-2 border-black rounded-full h-10 font-hanken-grotesk text-sm"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Card className="p-6 bg-foreground border-2 border-black shadow-plain-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderFieldText({
            label: 'First name',
            placeholder: 'Enter your first name',
            name: 'firstname',
          })}

          {renderFieldText({
            label: 'Last name',
            placeholder: 'Enter your last name',
            name: 'lastname',
          })}

          {renderFieldText({
            label: 'Email',
            placeholder: 'Enter your email',
            name: 'email',
          })}

          {renderFieldText({
            label: 'Password',
            placeholder: 'Enter your password',
            name: 'password',
          })}

          {renderFieldText({
            label: 'Promo Code',
            placeholder: 'Enter promo code',
            name: 'promoCode',
          })}

          <div className="h-2" />

          <Button
            size="lg"
            type="submit"
            className="w-full uppercase rounded-full border-2 border-black text-inverse font-bold font-hanken-grotesk shadow-plain hover:shadow-none transition-all"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Inscription en cours ...' : 'Inscription'}
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
  const features: FeatureItem[] = [
    {
      icon: <DollarSign />,
      title: 'Expense tracker',
      description: 'Automate the tracking of all of your expenses',
    },
    {
      icon: <Bell />,
      title: 'Intelligent alerts',
      description: 'Get notified of any price variation or due dates',
    },
    {
      icon: <Mail />,
      title: 'GoEmail',
      description: 'Automate the management of all your invoices',
    },
    {
      icon: <Lock />,
      title: 'Document vault',
      description: 'Secure your documents on a cloud-base server',
    },
    {
      icon: <Calendar />,
      title: 'Calendar sync',
      description: 'Sync your due dates with your personal calendar',
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
  const testimonials: TestimonialItem[] = [
    {
      name: 'Nathalie',
      city: 'Québec',
      since: new Date('2023-01-01'),
      quote:
        'The GoEmail feature saved my inbox from being overflooded and also organised my bills under one roof',
      imagePath: '/images/testimonials/1.jpg',
      explanation:
        'GoEmail is one of the core features of Edwix, skipping your inbox and synchronizing all your bills in Edwix, automatically!',
    },
    {
      name: 'Christian',
      city: 'Laval',
      since: new Date('2023-01-01'),
      quote:
        'I learned that I was paying too much electricity with the expense tracker, found out I had electrical problems that could’ve been costly if unfixed',
      imagePath: '/images/testimonials/2.jpg',
      explanation:
        'The Expense Tracker is a complete tool to categorise, track your different expenses and notify you of any changes.',
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
                User since {testimonial.since.toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="text-xl text-center font-medium">
            ‘’{'  '}
            {testimonial.quote}
            {'  '}’’
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
  // const [showSettings, setShowSettings] = React.useState(false);
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
        <div className="container text-center font-hanken-grotesk text-sm">
          You have a promo code? Redeem it right now!
          {/* <Button onClick={() => setShowSettings(true)}>Settings</Button> */}
          {/* <SettingsModal open={showSettings} onOpenChange={setShowSettings} /> */}
        </div>
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
              <HomePageBadge>Your all in one home management app</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center font-medium">
              <strong className="font-medium text-primary">Say goodbye</strong> to past due bills,
              underlying problems and growing home expenses
            </h2>

            <div className="flex items-center gap-3 py-4">
              <Link href="/case-studies">
                <Button
                  size="lg"
                  className="rounded-full font-hanken-grotesk border-2 border-black text-black h-12 shadow-plain hover:shadow-none transition-all"
                >
                  Case studies
                </Button>
              </Link>
              <Button
                size="lg"
                className="rounded-full font-hanken-grotesk border-2 border-black text-black h-12 shadow-plain bg-white hover:bg-foreground hover:shadow-none transition-all"
                onClick={_scrollToForm}
              >
                Get my 1 free year
              </Button>
            </div>

            <div className="w-full max-w-md px-8">
              <Image
                src="/images/hero-illustration.svg"
                alt="Edwix"
                className=""
                width={window.innerWidth}
                height={100}
              />
            </div>
          </div>
        </div>

        <div className="py-4 bg-foreground flex flex-col gap-4">
          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <HomePageBadge className="text-black">
                Rated
                <span className="inline-flex items-center -space-x-2.5">
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                  <Star className="h-3" fill="currentColor" />
                </span>
                by more than 1000+
              </HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              <strong className="font-medium text-primary">Thousands</strong> of users chose Edwix
              to manage their homes
            </h2>

            <HomePageTestimonials />
          </div>

          <div className="py-4 flex flex-col gap-4">
            <div className="flex justify-center">
              <HomePageBadge className="text-black">Features and benefits</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center text-black font-medium">
              We help you <strong className="font-medium text-primary">protect</strong> the biggest
              investment of your life
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
              <HomePageBadge>You are eligible to get one free year</HomePageBadge>
            </div>

            <h2 className="text-2xl mx-6 text-center font-medium">
              <strong className="font-medium text-primary">Say hello</strong> to one free year of
              ... peace of mind
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
