import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OutputCardProps {
  children: ReactNode;
  className?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function OutputCard({
  children,
  className,
  isEmpty = false,
  emptyMessage = "Your content will appear here.",
}: OutputCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 min-h-[200px] animate-fade-in",
        className
      )}
    >
      {isEmpty ? (
        <div className="flex items-center justify-center h-full min-h-[150px]">
          <p className="text-muted-foreground text-center">{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
