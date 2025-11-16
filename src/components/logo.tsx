import { cn } from "@/lib/utils";

export function Logo({ className, isLoginPage = false }: { className?: string, isLoginPage?: boolean }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div className="flex flex-col text-center">
        <h1 className={cn("font-headline text-5xl font-bold", isLoginPage ? 'text-foreground' : 'text-primary-foreground')}>ConviCo</h1>
        <p className="mt-1 text-sm text-muted-foreground">conversations that feel real</p>
      </div>
    </div>
  );
}
