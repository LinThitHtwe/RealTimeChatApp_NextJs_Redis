import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chatHrefConstructor(userId1: string, userId2: string) {
  const sortedIds = [userId1, userId2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}
