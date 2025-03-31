import { cva } from "class-variance-authority";

export const linkVariants = cva(
  "text-muted-foreground hover:text-primary underline underline-offset-4",
);
