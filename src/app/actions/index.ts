'use server';
import { cookies } from 'next/headers';

export async function setToken(accessToken: string, isAdmin: boolean) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 30,
  });

  cookieStore.set('isAdmin', isAdmin ? 'true' : 'false', {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 30,
  });
}

export async function getTokens() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value,
    isAdmin: cookieStore.get("isAdmin")?.value === 'true'
  };
}

export async function removeTokens() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("isAdmin");
}