# Exercise 6 - alarms

Start from your [exercise 5](README_ex5_MVC.md) MVC clock.

Add an **alarm**:

- the user picks an alarm time, and clicks **Set alarm** (or **Clear alarm** to turn it off)
- the page shows the alarm: `Alarm: off`, or `Alarm: 07:30`
- when the clock's time **is** the alarm time, the alarm **rings**: both time displays, and the alarm status,
  turn red and flash, and the status says `Alarm: 07:30 - RINGING!`
- the log shows the alarm too, e.g. `Clock time: 07:30, alarm: 07:30 - ALARM!`

Use the bumper buttons to move the time onto (and past) the alarm time, to test it.

This exercise shows MVC paying off: you'll add to the **model** (the alarm data and its rule), add one
**view**, change the existing views a little, and add to the **controller** - each part only doing its own job.

| Part | What changes |
|------|--------------|
| **Model** | holds the alarm time; knows the rule for when it is ringing |
| **Views** | the time views turn red when ringing; a new `AlarmView` shows the alarm; the log includes it |
| **Controller** | the **Set alarm** and **Clear alarm** buttons |

---

## Step 1 - the HTML and CSS

In `public/index.html`, add this just before the log's comment and `<h2>Log</h2>`:

```html
      <h2>Alarm</h2>
      <p>
        <input type="time" id="alarm-input" value="07:30" />
        <button id="set-alarm">Set alarm</button>
        <button id="clear-alarm" class="secondary">Clear alarm</button>
      </p>
      <p id="alarm-status">Alarm: off</p>
```

`<input type="time">` is a time picker, built into the browser. Its `value` is a string like `"07:30"` (always
24 hour), or `""` if nothing has been picked.
`value="07:30"` gives it a starting time, so **Set alarm** works straight away - without it, clicking **Set alarm**
before a full time (hours *and* minutes) has been picked does nothing.

You could also change the instruction at the top to `Use the buttons to change the time, and set an alarm.`

In `public/css/styles.css`, add a style for anything that is ringing. `animation` makes it flash: every second
it fades to 30%, then back:

```css
.ringing {
  color: var(--bad);
  animation: flash 1s step-start infinite;
}
@keyframes flash {
  50% { opacity: 0.3; }
}
```

---

## Step 2 - the model holds the alarm

The alarm is **data**, so it belongs in the model. It is either a time (hours and minutes), or **no alarm** -
`null`.

In `src/ClockModel.ts`, add a property, after `minutes`:

```ts
  private alarm: { hours: number; minutes: number } | null = null; // null = no alarm set
```

`{ hours: number; minutes: number }` is an **object type**: an object with those two properties.
`| null` means "or null".

Add these methods to the end of the class:

```ts
  // --- the alarm ---

  setAlarm(hours: number, minutes: number): void {
    this.alarm = { hours, minutes };
    this.notifyObservers();
  }

  clearAlarm(): void {
    this.alarm = null;
    this.notifyObservers();
  }

  getAlarm(): { hours: number; minutes: number } | null {
    return this.alarm;
  }

  // true when an alarm is set, and the clock's time is the alarm time
  isAlarmRinging(): boolean {
    return this.alarm !== null && this.alarm.hours === this.hours && this.alarm.minutes === this.minutes;
  }
```

`{ hours, minutes }` is short for `{ hours: hours, minutes: minutes }`.

Notice that changing the alarm **notifies the observers**, just like changing the time - the views need to
know.

And notice where the **rule** "is it ringing?" lives: in the model. Every view asks the model, so they can
never disagree about it.

Update the comment at the top: `the clock's data (the time and the alarm)`.

---

## Step 3 - the time views change when ringing

`classList.toggle(name, condition)` adds the CSS class `name` to an element when the condition is `true`, and
removes it when it is `false`.

In `src/views/Time24View.ts` **and** `src/views/Time12View.ts`, add one line to the end of `update()`:

```ts
    this.element.classList.toggle("ringing", model.isAlarmRinging()); // adds the class when ringing, removes it when not
```

---

## Step 4 - a new view: `AlarmView`

Create `src/views/AlarmView.ts`. It is a view like the others: it observes the model, and shows part of it - the
alarm.

```ts
// AlarmView.ts - a VIEW: shows whether an alarm is set, and whether it is ringing.

import type { ClockModel } from "../ClockModel.ts";
import type { Observer } from "../Observer.ts";
import { format24 } from "../timeFormat.ts";

export class AlarmView implements Observer<ClockModel> {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(model: ClockModel): void {
    const alarm = model.getAlarm();
    if (alarm === null) {
      this.element.textContent = "Alarm: off";
    } else if (model.isAlarmRinging()) {
      this.element.textContent = `Alarm: ${format24(alarm.hours, alarm.minutes)} - RINGING!`;
    } else {
      this.element.textContent = `Alarm: ${format24(alarm.hours, alarm.minutes)}`;
    }
    this.element.classList.toggle("ringing", model.isAlarmRinging());
  }
}
```

After the `if (alarm === null)` check, TypeScript knows that `alarm` can't be `null` in the `else` branches, so
it lets you use `alarm.hours`.

In `src/main.ts`, import it:

```ts
import { AlarmView } from "./views/AlarmView.ts";
```

find its element, with the others in step (1):

```ts
const alarmStatusElement = document.getElementById("alarm-status") as HTMLElement;
```

and add it as an observer, with the others in step (3):

```ts
model.addObserver(new AlarmView(alarmStatusElement));
```

---

## Step 5 - the log shows the alarm

In `src/views/LogView.ts`, replace the line that adds to `value` with:

```ts
    const alarm = model.getAlarm();
    const alarmText = alarm === null ? "off" : format24(alarm.hours, alarm.minutes);
    const ringing = model.isAlarmRinging() ? " - ALARM!" : "";
    const time = format24(model.getHours(), model.getMinutes());
    this.logElement.value += `Clock time: ${time}, alarm: ${alarmText}${ringing}\n`;
```

---

## Step 6 - the controller handles the alarm buttons

In `src/ClockController.ts`, add two lines to the end of `connectButtons()`:

```ts
    this.onClick("set-alarm", () => this.setAlarmFromInput());
    this.onClick("clear-alarm", () => this.model.clearAlarm());
```

and this method, which reads the time picker and turns its `"07:30"` into two numbers:

```ts
  // Reads the alarm time from the <input type="time">, whose value is like "07:30" (or "" if it is empty)
  private setAlarmFromInput(): void {
    const input = document.getElementById("alarm-input") as HTMLInputElement;
    if (input.value === "") return; // nothing chosen yet

    const [hours, minutes] = input.value.split(":").map(Number);
    this.model.setAlarm(hours, minutes);
  }
```

- `"07:30".split(":")` is `["07", "30"]`
- `.map(Number)` turns each string into a number: `[7, 30]`
- `const [hours, minutes] = ...` puts the first item in `hours` and the second in `minutes` (this is called
  **destructuring**)

Reading the input is the controller's job - it is the user's input. The model is only ever given numbers.

---

## Step 7 - test the alarm rule

Add these tests to the end of `tests/ClockModel_test.ts`. They test the model's alarm rule, with no web page:

```ts
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
```

---

## Check

- [ ] The page starts with `Alarm: off`
- [ ] Pick a time 2 minutes after the clock's time, and click **Set alarm**: the status shows it, and the log
      has a new line
- [ ] Click **+ minute** twice: both time displays and the status turn red and flash, and the log says
      `- ALARM!`
- [ ] Click **+ minute** again: the alarm stops ringing (but is still set)
- [ ] Go back with **- minute**: it rings again. **Clear alarm**: it stops, and the status says `Alarm: off`
- [ ] **Set alarm** with an empty time picker does nothing
- [ ] The console shows `10 passed`, `0 type errors, 0 lint warnings`

## Try it yourself

1. **Snooze**: add a **Snooze** button that moves the alarm 5 minutes later. Which part(s) of MVC change?
   (Hint: the model needs a `snooze()` method, and the controller a button. The views don't change.)
2. **Make a sound** when the alarm starts ringing: a new view that keeps track of whether it was ringing last
   time it was updated, and plays a sound (`new Audio("...").play()`) only when it *starts*.
3. **A real alarm clock**: call `model.setToNow()` every second with `setInterval()`, so the alarm rings at the
   real time. The log will get a new line every second - change `LogView` so it only adds a line when the time
   or the alarm actually changed.
4. **Several alarms**: change the model to hold a list of alarms. Which views need to change?
