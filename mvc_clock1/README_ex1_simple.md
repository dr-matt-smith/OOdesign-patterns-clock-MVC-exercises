# Exercise 1 - a simple clock

Build the simplest possible clock: when the page loads, it shows the current time, as `HH:MM`.

- no buttons
- no log
- no updating: the time is read **once**, when the `Clock` object is created

By the end you will have 3 files:

| File | What it does |
|------|--------------|
| `public/index.html` | the page, with one element for the time |
| `src/Clock.ts` | the `Clock` class: it holds the time, and shows it on the page |
| `src/main.ts` | finds the HTML element, creates a `Clock`, and tells it to show the time |

Keep `deno task dev` running while you work (Celbridge starts it for you in the console at the bottom). Every
time you save, it rebuilds `dist/` - press refresh on the `dist/index.html` preview to see your changes.

---

## Step 1 - the HTML page

Replace `public/index.html` with this. The `<p id="time">` is where the time will go - `--:--` is only shown
until the TypeScript code replaces it.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/styles.css" />
    <title>Clock</title>
  </head>
  <body>
    <main>
      <h1>Clock</h1>

      <!-- Clock.ts writes the time into this element -->
      <p id="time">--:--</p>
    </main>

    <script src="app.js"></script>
  </body>
</html>
```

`app.js` is the bundled version of `src/main.ts` (and everything it imports) - the build makes it for you.

Make the time big, by adding this to the end of `public/css/styles.css`:

```css
#time {
  font-size: 3em;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  margin: 0.3em 0;
}
```

Save, and refresh the preview: you should see **Clock** and a big `--:--`.

---

## Step 2 - the `Clock` class, with its properties

Create `src/Clock.ts`. A clock needs to remember the hours and minutes, and the HTML element it shows them in:

```ts
// Clock.ts - a simple clock. It reads the time once, when it is created, and can show it on the page.

export class Clock {
  private hours: number;
  private minutes: number;
  private displayElement: HTMLElement;
}
```

`export` lets other files (`main.ts`) import the class. `private` means only the `Clock` itself can read or
change these properties.

TypeScript will complain that the properties are never given a value - the constructor, next, fixes that.

---

## Step 3 - the constructor reads the time

Add a constructor inside the class. JavaScript's `Date` class holds a date and time; `new Date()` is **now**,
and `getHours()` / `getMinutes()` give its hours (0 - 23) and minutes (0 - 59):

```ts
  constructor(displayElement: HTMLElement) {
    this.displayElement = displayElement;

    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
  }
```

---

## Step 4 - formatting the time as text

`9` hours and `5` minutes should be shown as `09:05`, not `9:5`. `padStart(2, "0")` adds `"0"`s to the start of
a string until it is 2 characters long. Add this method:

```ts
  // The time as "HH:MM", e.g. "09:05"
  getTimeString(): string {
    const hh = String(this.hours).padStart(2, "0");
    const mm = String(this.minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  }
```

The backticks make a **template string**: `${...}` puts the value of an expression into the string.

---

## Step 5 - showing the time on the page

Add one more method. `textContent` is the text inside an HTML element - setting it replaces the `--:--`:

```ts
  // Shows the time on the HTML page
  display(): void {
    this.displayElement.textContent = this.getTimeString();
  }
```

---

## Step 6 - `main.ts` puts it all together

Replace `src/main.ts` with:

```ts
// main.ts finds the HTML element for the time, creates the clock, and shows the time.

import { Clock } from "./Clock.ts";

const timeElement = document.getElementById("time") as HTMLElement;

const clock = new Clock(timeElement);
clock.display();
```

`document.getElementById("time")` finds the `<p id="time">` in the page. It might find nothing (if there is
no element with that id), so TypeScript says it returns `HTMLElement | null`; `as HTMLElement` tells TypeScript
"trust me, it is there".

Save, and refresh the preview: you should see the current time.

---

## Check

- [ ] The page shows the current time, e.g. `09:05`
- [ ] A time before 10 o'clock, or with fewer than 10 minutes, has a leading `0`
- [ ] Refreshing the page (a minute later) shows the new time - but the time **never changes by itself**
- [ ] The console shows `0 type errors, 0 lint warnings`

## Try it yourself

1. Add **seconds** (`getSeconds()`), so the clock shows `09:05:42`.
2. Add a `<p id="date">` and show today's date as well, e.g. `5/11/2026` (`getDate()`, `getMonth()` - careful:
   January is month `0` - and `getFullYear()`).
3. Who reads the time, and who shows it? Right now, `Clock` does both. Keep that in mind - it is the problem the
   MVC design pattern solves, in [exercise 5](README_ex5_MVC.md).

Next: [exercise 2 - an interactive clock](README_ex2_interactive.md).
