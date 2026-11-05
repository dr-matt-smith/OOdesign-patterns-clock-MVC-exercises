# Clock 6 - alarms - `mvc_clock6/`

**Solution** to [exercise 6 - alarms](README_ex6_alarms.md).

The MVC clock with an alarm. When the clock's time matches the alarm time, the time displays and the alarm status turn red and flash, and the log says `- ALARM!`.

## The code

| File | What it does |
|------|--------------|
| `src/ClockModel.ts` | the **model**: the time, the alarm, and the rule for when it is ringing. It extends `Subject` |
| `src/Subject.ts`, `src/Observer.ts` | the Observer pattern, unchanged from exercise 5 |
| `src/views/AlarmView.ts` | a new **view**: shows the alarm, and whether it is ringing |
| `src/views/Time24View.ts`, `src/views/Time12View.ts` | **views**: the two displays - they flash when the alarm rings |
| `src/views/LogView.ts` | a **view**: the log, now including the alarm |
| `src/ClockController.ts` | the **controller**: the bumper buttons, plus **Set alarm** and **Clear alarm** |
| `src/main.ts` | creates the model, the views and the controller, and connects them |
| `tests/` | automatic tests, including the alarm rule |

## Exercises

Do them in order - each one starts from your answer to the one before. Every project has all six exercises;
this one is the solution to exercise 6.

| Exercise | What you build | Solution |
|----------|----------------|----------|
| [1 - simple](README_ex1_simple.md) | shows the time once, when the page loads | `mvc_clock1/` |
| [2 - interactive](README_ex2_interactive.md) | an **Update display** button, and a log | `mvc_clock2/` |
| [3 - bumpers](README_ex3_bumpers.md) | buttons to move the time up and down, for testing | `mvc_clock3/` |
| [4 - 24 and 12 hour](README_ex4_24_and_12_hour.md) | two displays of the same time | `mvc_clock4/` |
| [5 - MVC](README_ex5_MVC.md) | the same clock, rebuilt with Model-View-Controller | `mvc_clock5/` |
| [6 - alarms](README_ex6_alarms.md) | an alarm that makes the displays flash | `mvc_clock6/` |

## Running it

Open this folder in Celbridge (`mvc_clock6.celbridge`). The console at the bottom starts by itself, and runs
`deno task dev`, which builds `src/` and `public/` into `dist/`, runs the tests, and does it all again on
every save.

Without Celbridge: run `deno task dev` from a terminal in this folder, and open `dist/index.html` in any
browser.
