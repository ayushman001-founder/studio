'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthForm({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState('login');

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/characters');
    }, 1000);
  };

  const onRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/characters');
    }, 1000);
  };
  
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit(onLogin)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...registerLogin('email')}
                />
                {loginErrors.email && <p className="text-xs text-destructive">{loginErrors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" disabled={isLoading} {...registerLogin('password')} />
                {loginErrors.password && <p className="text-xs text-destructive">{loginErrors.password.message}</p>}
              </div>
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit(onRegister)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...registerRegister('email')}
                />
                {registerErrors.email && <p className="text-xs text-destructive">{registerErrors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" disabled={isLoading} {...registerRegister('password')} />
                {registerErrors.password && <p className="text-xs text-destructive">{registerErrors.password.message}</p>}
              </div>
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
          <path
            fill="currentColor"
            d="M23.529 8.242a.473.473 0 0 0-.47-.47h-4.32V6.017a.471.471 0 0 0-.47-.47h-1.74a.471.471 0 0 0-.47.47v1.755h-3.48V6.017a.471.471 0 0 0-.47-.47h-1.74a.471.471 0 0 0-.47.47v1.755H5.59a.471.471 0 0 0-.47.47v1.755h-4.32a.47.47 0 0 0-.47.47v1.755a.47.47 0 0 0 .47.47h4.32v1.755a.471.471 0 0 0 .47.47h4.32v1.755a.471.471 0 0 0 .47.47h1.74a.471.471 0 0 0 .47-.47v-1.755h3.48v1.755a.471.471 0 0 0 .47.47h1.74a.471.471 0 0 0 .47-.47v-1.755h4.32a.47.47 0 0 0 .47-.47V8.242zm-5.26 1.755h-4.32a.47.47 0 0 0-.47.47v1.755h-1.74v-1.755a.47.47 0 0 0-.47-.47h-3.48a.47.47 0 0 0-.47.47v1.755H2.99V8.712h3.48a.471.471 0 0 0 .47-.47V6.487h1.74v1.755a.47.47 0 0 0 .47.47h3.48a.47.47 0 0 0 .47-.47V6.487h1.74v1.755a.47.47 0 0 0 .47.47h3.48v3.04h-4.32z"
          />
        </svg>
        Mobile Number
      </Button>
    </div>
  );
}
