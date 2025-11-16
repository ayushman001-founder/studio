import { AuthFormClient } from '@/components/auth/auth-form-client';
import { Logo } from '@/components/logo';

export default function AuthenticationPage() {
  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1516738901171-81b46e396d24?q=80&w=2070&auto=format&fit=crop)',
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="font-headline text-5xl font-bold text-primary-foreground">ConviCo</h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;The art of conversation is the art of hearing as well as of being heard.&rdquo;
            </p>
            <footer className="text-sm">Danielle Sered</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Logo isLoginPage={true} />
          </div>
          <AuthFormClient />
        </div>
      </div>
    </div>
  );
}
