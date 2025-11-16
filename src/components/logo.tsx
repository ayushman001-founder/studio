import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, isLoginPage = false }: { className?: string, isLoginPage?: boolean }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative h-16 w-16">
        <Image 
          src="/convico-logo.png" 
          alt="ConviCo Logo" 
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h1 className={cn("font-headline text-5xl font-bold", isLoginPage ? 'text-foreground' : 'text-primary-foreground')}>ConviCo</h1>
        <p className="mt-1 text-sm text-muted-foreground">conversations that feel real</p>
      </div>
    </div>
  );
}
