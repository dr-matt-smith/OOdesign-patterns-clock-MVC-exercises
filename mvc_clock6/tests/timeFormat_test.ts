import { assertEquals } from "@std/assert";
import { format12, format24 } from "../src/timeFormat.ts";

Deno.test("format24 pads hours and minutes to 2 digits", () => {
  assertEquals(format24(9, 5), "09:05");
  assertEquals(format24(21, 45), "21:45");
});

Deno.test("format12 handles midnight, noon, morning and afternoon", () => {
  assertEquals(format12(0, 0), "12:00 am");
  assertEquals(format12(9, 5), "9:05 am");
  assertEquals(format12(12, 0), "12:00 pm");
  assertEquals(format12(13, 5), "1:05 pm");
  assertEquals(format12(23, 59), "11:59 pm");
});
