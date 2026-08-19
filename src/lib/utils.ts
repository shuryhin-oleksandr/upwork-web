import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createTwc } from "react-twc";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twx = createTwc({
  compose: cn,
  shouldForwardProp: (prop) => prop[0] !== "_",
});
