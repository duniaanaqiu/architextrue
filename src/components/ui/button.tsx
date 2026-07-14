import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-label-md text-label-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 scale-95 active:scale-90 transition-transform",
  {
    variants: {
      variant: {
        default: "bg-primary text-on-primary hover:bg-primary-container ambient-shadow-1",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary",
        outline: "border border-primary text-primary hover:bg-primary hover:text-on-primary",
        ghost: "hover:bg-surface-container hover:text-on-surface",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-error text-on-error hover:bg-error/90",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-9 px-4 text-sm",
        lg: "h-11 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }