import cx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const classNames = (...inputs: ClassValue[]) => twMerge(cx(inputs));

export default classNames;
