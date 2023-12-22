import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLastEdited(date: Date): string {
  const now = new Date();

  // Get the difference in time between the current date and the last edited date
  const diff = now.getTime() - date.getTime();

  // Calculate the difference in various units
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Create a relative time formatter
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  // Return the appropriate string based on the time difference
  if (weeks > 1) return `${date.toLocaleDateString()}`;
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  
  return rtf.format(-seconds, 'second');
}
