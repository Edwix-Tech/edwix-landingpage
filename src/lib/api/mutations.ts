import { env } from '@/lib/env';

export interface RegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  promoCode: string;
}

export interface RegisterResponse {
  accessToken: string;
}

export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const url = new URL('/api/authentication/register', env().API_URL);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      stripe_promo_code: data.promoCode,
    }),
  });

  if (!response.ok) {
    throw new Error('Register failed');
  }

  return response.json();
};
