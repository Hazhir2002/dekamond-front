import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex w-full text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "h-10 rounded-md border border-input bg-background px-3 py-2 shadow-sm",
        glass: "h-10 rounded-md border border-white/20 bg-white/10 dark:bg-cinema-dark/60 backdrop-blur-md px-3 py-2 shadow-lg focus:bg-white/20",
      },
      shape: {
        default: "rounded-md",
        pill: "rounded-full",
      },
      error: {
        true: "border-red-500 focus-visible:ring-red-500 animate-shake",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      error: false,
    },
  }
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, shape, error = false, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && <span className="absolute right-3 text-gray-400 pointer-events-none">{leftIcon}</span>}
        <input
          className={cn(
            inputVariants({ variant, shape, error, className }),
            leftIcon ? "pr-10" : "",
            rightIcon ? "pl-10" : "",
            "focus:scale-[1.02]"
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && <span className="absolute left-3 text-gray-400 pointer-events-none">{rightIcon}</span>}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
