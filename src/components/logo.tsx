import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <h1 className="font-headline text-5xl font-bold text-primary">ConviCo</h1>
      <p className="mt-1 text-sm text-muted-foreground">conversations that feel real</p>
    </div>
  );
}
