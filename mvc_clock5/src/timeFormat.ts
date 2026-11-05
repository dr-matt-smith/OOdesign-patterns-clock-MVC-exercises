// timeFormat.ts - turns hours and minutes into text. Used by the views.
// These are plain functions (no HTML), so they are easy to test.

// 24 hour form, e.g. "09:05" or "21:05"
export function format24(hours: number, minutes: number): string {
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

// 12 hour form, e.g. "9:05 am" or "9:05 pm"
export function format12(hours: number, minutes: number): string {
  const amPm = hours < 12 ? "am" : "pm";
  const hours12 = hours % 12 === 0 ? 12 : hours % 12; // 0 -> 12 (midnight), 13 -> 1, ...
  const mm = String(minutes).padStart(2, "0");
  return `${hours12}:${mm} ${amPm}`;
}
