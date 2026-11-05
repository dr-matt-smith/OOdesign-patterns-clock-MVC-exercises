# Exercise 4 - 24 hour and 12 hour displays

Start from your [exercise 3 (bumpers)](README_ex3_bumpers.md) clock.

Show the time **twice**: once in 24 hour form, and once in 12 hour form.

| 24 hour | 12 hour |
|---------|---------|
| `00:00` | `12:00 am` |
| `09:05` | `9:05 am` |
| `12:00` | `12:00 pm` |
| `13:05` | `1:05 pm` |
| `23:59` | `11:59 pm` |

Notice the two tricky ones: there is no `0` o'clock in 12 hour time - midnight is `12:00 am`, and noon is
`12:00 pm`. The bumper buttons make it easy to test them.

---

## Step 1 - two displays in the HTML

In `public/index.html`, replace the `<p id="time">` (and its comment) with:

```html
      <!-- Clock.ts writes the time into these two elements -->
      <p class="label">24 hour</p>
      <p id="time-24" class="time">--:--</p>
      <p class="label">12 hour</p>
      <p id="time-12" class="time">--:--</p>
```

An `id` must be unique on the page, so the two displays get different ids. Their **look** is the same, so it
moves to a `class`, which many elements can share. In `public/css/styles.css`, change `#time {` to `.time {` (a
`.` means a class, a `#` means an id), and add a style for the labels:

```css
.label { margin: 1em 0 0; color: var(--muted); }
```

---

## Step 2 - two ways to format the time

In `src/Clock.ts`, rename `getTimeString()` to `getTime24String()` (and change its comment to
`// The time in 24 hour form, e.g. "09:05" or "21:05"`). Then add:

```ts
  // The time in 12 hour form, e.g. "9:05 am" or "9:05 pm"
  getTime12String(): string {
    const amPm = this.hours < 12 ? "am" : "pm";
    const hours12 = this.hours % 12 === 0 ? 12 : this.hours % 12; // 0 -> 12 (midnight), 13 -> 1, ...
    const mm = String(this.minutes).padStart(2, "0");
    return `${hours12}:${mm} ${amPm}`;
  }
```

`condition ? a : b` is the **conditional operator**: `a` if the condition is true, otherwise `b`.

`this.hours % 12` turns `13` into `1`, `23` into `11` - but `0` and `12` both become `0`, which should be
shown as `12`.

---

## Step 3 - two display elements

The `Clock` now needs **two** display elements. Replace the `displayElement` property and the constructor with:

```ts
  private display24Element: HTMLElement;
  private display12Element: HTMLElement;
  private logElement: HTMLTextAreaElement;

  constructor(display24Element: HTMLElement, display12Element: HTMLElement, logElement: HTMLTextAreaElement) {
    this.display24Element = display24Element;
    this.display12Element = display12Element;
    this.logElement = logElement;
  }
```

and `display()` and `log()` with:

```ts
  // Shows the time on the HTML page, in both forms
  display(): void {
    this.display24Element.textContent = this.getTime24String();
    this.display12Element.textContent = this.getTime12String();
  }

  // Adds the time as a new line in the log textarea, and scrolls down so the newest line is visible
  log(): void {
    this.logElement.value += `Clock time: ${this.getTime24String()} (${this.getTime12String()})\n`;
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }
```

---

## Step 4 - `main.ts` finds both elements

In `src/main.ts`, replace the line that finds `"time"`, and the line that creates the clock, with:

```ts
const time24Element = document.getElementById("time-24") as HTMLElement;
const time12Element = document.getElementById("time-12") as HTMLElement;
const logElement = document.getElementById("log") as HTMLTextAreaElement;

const clock = new Clock(time24Element, time12Element, logElement);
```

Nothing else in `main.ts` changes - the buttons still just call `addHours()`, `addMinutes()` and
`updateTime()`.

---

## Check

Use the bumpers to check every row of the table at the top - especially midnight and noon.

- [ ] Both displays always show the same time
- [ ] The log shows both forms, e.g. `Clock time: 13:05 (1:05 pm)`
- [ ] The console shows `0 type errors, 0 lint warnings`

## Try it yourself - and think about the design

1. Count how many places you had to change to add **one** new display: the HTML, the CSS, a property, the
   constructor (and its parameters), `display()`, `log()`, and `main.ts`. Most of them are in `Clock`.
2. Now imagine adding a third display - an analogue clock face, drawn on a `<canvas>`. `Clock` would need
   *another* element, *another* constructor parameter, and *more* drawing code in `display()`.
3. Could you test `getTime12String()` with an automatic test, in `tests/`? Not easily: you can't make a `Clock`
   without HTML elements to give its constructor.

`Clock` has too many jobs - it is the **data**, the rules for **changing** the data, **and** every **display**.
That is exactly what [exercise 5 - MVC](README_ex5_MVC.md) splits apart.
