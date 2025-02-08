import { baseApi } from '@/lib/constants';

type Register = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default async function fetchRegister(body: Register) {
  try {
    const res = await fetch(`${baseApi}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e.message);
  }
}
