import type { AnchorHTMLAttributes, FunctionComponent } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { linkVariants } from "./variants";

interface AnchorProps
  extends
    AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

const Anchor: FunctionComponent<AnchorProps> = ({ className, ...props }) => {
  return <a className={cn(linkVariants(), className)} {...props} />;
};

Anchor.displayName = "Anchor";

export default Anchor;
