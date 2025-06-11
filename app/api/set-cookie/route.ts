import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { accessToken, email, firstName, lastName, role } = body;

  const cookieStore = cookies();

  // HttpOnly token (secure for auth)
  cookieStore.set('accessToken', accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Non-httpOnly cookies (readable in browser if needed)
  cookieStore.set('email', email, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('firstName', firstName, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('lastName', lastName, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set('role', role, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ message: 'Cookies set successfully' });
}
