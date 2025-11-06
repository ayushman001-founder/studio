'use client';

import { useEffect, useState } from 'react';
import { AuthForm } from './auth-form';

export function AuthFormClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return <AuthForm />;
}
