import { cva } from "class-variance-authority";

export const linkVariants = cva(
  "text-muted-foreground underline underline-offset-4 hover:text-primary",
);
