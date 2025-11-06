import { AuthForm } from '@/components/auth/auth-form';
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6.34C14.37 6.12 13.7 6 13 6a5 5 0 0 0-5 5c0 .7.12 1.37.34 2" />
            <path d="M9 17.66C9.63 17.88 10.3 18 11 18a5 5 0 0 0 5-5c0-.7-.12-1.37-.34-2" />
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <path d="M12 12v0" />
          </svg>
          ConviCo
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
             <Logo />
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
