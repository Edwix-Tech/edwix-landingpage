import type { Metadata } from 'next';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { ReactQueryProvider } from '@/components/react-query-provider';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { Lora, Hanken_Grotesk } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
});

export const metadata: Metadata = {
  title: 'Edwix Landingpage',
  description: 'Edwix Landingpage',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${lora.className} ${hankenGrotesk.variable} antialiased`}>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
