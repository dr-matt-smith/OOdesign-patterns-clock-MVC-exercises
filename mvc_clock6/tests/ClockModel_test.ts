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

Deno.test("there is no alarm to start with", () => {
  const model = new ClockModel();
  assertEquals(model.getAlarm(), null);
  assertEquals(model.isAlarmRinging(), false);
});

Deno.test("the alarm rings only when the time matches the alarm time", () => {
  const model = new ClockModel();
  model.setAlarm(7, 30);

  model.setTime(7, 29);
  assertEquals(model.isAlarmRinging(), false);

  model.addMinutes(1); // 07:30
  assertEquals(model.isAlarmRinging(), true);

  model.addMinutes(1); // 07:31
  assertEquals(model.isAlarmRinging(), false);
});

Deno.test("clearing the alarm stops it ringing", () => {
  const model = new ClockModel();
  model.setTime(7, 30);
  model.setAlarm(7, 30);
  assertEquals(model.isAlarmRinging(), true);

  model.clearAlarm();
  assertEquals(model.isAlarmRinging(), false);
});
