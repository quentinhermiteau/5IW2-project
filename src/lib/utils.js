import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#^!%*?&-])[A-Za-z\d@$#^!%*?&-]{10,}$/;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
