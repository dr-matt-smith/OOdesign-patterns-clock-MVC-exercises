import { assertEquals } from "@std/assert";
import { ClockModel } from "../src/ClockModel.ts";

Deno.test("addMinutes moves the time forward", () => {
  const model = new ClockModel();
  model.setTime(10, 15);
  model.addMinutes(5);
  assertEquals(model.getHours(), 10);
  assertEquals(model.getMinutes(), 20);
});

Deno.test("addMinutes wraps past midnight", () => {
  const model = new ClockModel();
  model.setTime(23, 59);
  model.addMinutes(1);
  assertEquals(model.getHours(), 0);
  assertEquals(model.getMinutes(), 0);
});

Deno.test("addHours wraps backwards past midnight", () => {
  const model = new ClockModel();
  model.setTime(0, 30);
  model.addHours(-1);
  assertEquals(model.getHours(), 23);
  assertEquals(model.getMinutes(), 30);
});

Deno.test("observers are told about every change", () => {
  const model = new ClockModel();
  let updates = 0;
  model.addObserver({ update: () => updates++ });

  model.setTime(10, 0);
  model.addMinutes(1);
  model.addHours(1);

  assertEquals(updates, 3);
});

Deno.test("a removed observer is not told about changes", () => {
  const model = new ClockModel();
  let updates = 0;
  const counter = { update: () => updates++ };
  model.addObserver(counter);

  model.setTime(10, 0); // told
  model.removeObserver(counter);
  model.setTime(11, 0); // not told

  assertEquals(updates, 1);
});
