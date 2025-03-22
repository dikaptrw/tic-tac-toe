import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// class name merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
