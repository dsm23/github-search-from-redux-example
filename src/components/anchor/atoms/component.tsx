import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { linkVariants } from "./variants";

export interface ButtonProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const Anchor = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp className={cn(linkVariants(), className)} ref={ref} {...props} />
    );
  },
);

Anchor.displayName = "Anchor";

export default Anchor;
