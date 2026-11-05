# Exercise 3 - bumper buttons

Start from your [exercise 2](README_ex2_interactive.md) clock.

To test a clock properly you need to try lots of times - midnight, noon, `09:05`, `23:59` ... - and you can't
wait for the real time to get there. So add **bumper** buttons, that move the clock's time up and down:

| Button | What it does |
|--------|--------------|
| **- hour** / **+ hour** | moves the time back / forward one hour |
| **- minute** / **+ minute** | moves the time back / forward one minute |
| **Set to current time** | sets the clock to the real time (this replaces **Update display**) |

The clock is **no longer linked to the actual time**: it starts at the current time, but after that it only
changes when a button is clicked. Every change is shown, and added to the log.

The time must **wrap round midnight**: one minute after `23:59` is `00:00`, and one hour before `00:30` is
`23:30`.

---

## Step 1 - the buttons

In `public/index.html`, change the instruction under the `<h1>`:

```html
      <p class="muted">Use the buttons to change the time. Every change is added to the log below.</p>
```

and replace the `<button id="update-button">` with:

```html
      <p>
        <button id="hour-down">- hour</button>
        <button id="hour-up">+ hour</button>
        <button id="minute-down">- minute</button>
        <button id="minute-up">+ minute</button>
      </p>
      <p>
        <button id="now-button" class="secondary">Set to current time</button>
      </p>
```

`class="secondary"` is an outlined button style, already in `styles.css`.

---

## Step 2 - adding minutes, wrapping round midnight

The easy way to add (or take away) minutes, *and* carry over into the hours, *and* wrap round midnight, is to
turn the time into **minutes since midnight**, do the sum, and turn it back:

| Time | Minutes since midnight |
|------|------------------------|
| `00:00` | `0` |
| `09:05` | `9 * 60 + 5` = `545` |
| `23:59` | `23 * 60 + 59` = `1439` |

There are `24 * 60` = `1440` minutes in a day, so `% 1440` (the remainder after dividing by 1440) wraps the
total round midnight: `1440 % 1440` is `0`.

One catch: in TypeScript `%` keeps the sign, so `-1 % 1440` is `-1`, not `1439`. Adding `1440` and doing `%`
again fixes that.

In `src/Clock.ts`, add a constant above the class:

```ts
const MINUTES_PER_DAY = 24 * 60;
```

and these two methods to the class:

```ts
  // Moves the time forward (or back, if minutesToAdd is negative), wrapping round midnight
  addMinutes(minutesToAdd: number): void {
    const totalMinutes = this.hours * 60 + this.minutes + minutesToAdd;
    // % can give a negative answer in TypeScript (-1 % 1440 is -1), so add MINUTES_PER_DAY and % again
    const wrapped = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    this.hours = Math.floor(wrapped / 60);
    this.minutes = wrapped % 60;
  }

  addHours(hoursToAdd: number): void {
    this.addMinutes(hoursToAdd * 60);
  }
```

`addHours()` doesn't need any sums of its own: an hour is just 60 minutes.

Also, change the comment on `updateTime()` to `// Sets the clock to the current time, from the computer's
clock`, and the comment at the top of the file to say the clock also *changes* the time when asked:

```ts
// Clock.ts - a simple clock that does EVERYTHING itself:
//   - it holds the time (the data), and changes it when asked (the bumper buttons)
//   - it shows the time on the HTML page, and adds it to the log on the page (the output)
```

---

## Step 3 - connect the buttons in `main.ts`

There are now 5 buttons, and each one does the same 3 things: **change** the time, **show** it, **log** it.
Only the change is different. So, rather than writing 5 nearly identical event listeners, write two small
functions:

- `showTime()` shows and logs the time
- `onClick(id, change)` finds the button with that `id`, and when it is clicked, calls `change()` and then
  `showTime()`

Replace `src/main.ts` with:

```ts
// main.ts wires everything together: it finds the HTML elements, creates the clock,
// and changes the clock each time the user clicks one of the buttons.

import { Clock } from "./Clock.ts";

const timeElement = document.getElementById("time") as HTMLElement;
const logElement = document.getElementById("log") as HTMLTextAreaElement;

const clock = new Clock(timeElement, logElement);

// Shows and logs the clock's time - called after every change
function showTime(): void {
  clock.display();
  clock.log();
}

// Each button changes the time, then shows it
function onClick(id: string, change: () => void): void {
  const button = document.getElementById(id) as HTMLButtonElement;
  button.addEventListener("click", () => {
    change();
    showTime();
  });
}

onClick("hour-up", () => clock.addHours(1));
onClick("hour-down", () => clock.addHours(-1));
onClick("minute-up", () => clock.addMinutes(1));
onClick("minute-down", () => clock.addMinutes(-1));
onClick("now-button", () => clock.updateTime());

// Start at the current time
clock.updateTime();
showTime();
```

`change: () => void` means "`change` is a function that takes nothing and returns nothing". Each `onClick(...)`
line passes a different arrow function as `change`.

---

## Check

Use the bumpers to test these - the log shows every step:

| Start at | Click | Should show |
|----------|-------|-------------|
| any time | **+ minute** | one minute later |
| `10:59` | **+ minute** | `11:00` |
| `23:59` | **+ minute** | `00:00` |
| `00:00` | **- minute** | `23:59` |
| `00:30` | **- hour** | `23:30` |
| any time | **Set to current time** | the real time again |

- [ ] The page starts at the current time (and logs it)
- [ ] The time does **not** change by itself
- [ ] The console shows `0 type errors, 0 lint warnings`

## Try it yourself

1. Add **+10 minutes** and **-10 minutes** buttons. How many lines of code did each one take?
2. Add **Midnight** and **Noon** buttons. You'll need a new `Clock` method, `setTime(hours, minutes)`.
3. `Clock` is getting bigger: data, rules for changing the data, *and* output. And `main.ts` must remember to
   call `showTime()` after every change - forget once, and the page is out of date. MVC (in
   [exercise 5](README_ex5_MVC.md)) fixes both.

Next: [exercise 4 - 24 and 12 hour displays](README_ex4_24_and_12_hour.md).
