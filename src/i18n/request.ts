import { getRequestConfig } from 'next-intl/server';
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  const headersList = await headers();
  let locale = headersList.get('x-next-intl-locale') || 'en';
  const localePath = path.join(process.cwd(), `src/i18n/messages/${locale}.json`);

  // Verify the locale file exists
  if (
    !(await fs
      .access(localePath)
      .then(() => true)
      .catch(() => false))
  ) {
    locale = 'en';
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale,
  };
});
