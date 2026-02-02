import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: "left" | "right";
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, direction = "right", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-none overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          direction === "left" && "flex-row-reverse"
        )}
      >
        <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        {direction === "right" ? <ArrowRight /> : <ArrowLeft />}
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
