import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ThemeProvider } from "../providers/theme-provider";// Import ThemeProvider from next-themes
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-red-600 dark:text-white dark:hover:bg-red-500",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:text-gray-300",
        link:
          "text-primary underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300",
        primary:
          "bg-sky-700 text-primary-foreground hover:bg-sky-700/90 dark:bg-sky-600 dark:text-white dark:hover:bg-sky-500",
        transparent:
          "bg-transparent text-white hover:bg-white/20 dark:text-gray-300 dark:hover:bg-gray-700",
        gray:
          "bg-neutral-200 text-secondary-foreground hover:bg-neutral-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        inline: "h-auto px-2 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        storageKey="task-mo-theme"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </ThemeProvider>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
