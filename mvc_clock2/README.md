# Clock 2 - an interactive clock - `mvc_clock2/`

**Solution** to [exercise 2 - an interactive clock](README_ex2_interactive.md).

Each click on **Update display** reads the current time, shows it, and adds it to the read-only **Log** box at the bottom of the page.

## The code

| File | What it does |
|------|--------------|
| `src/Clock.ts` | the `Clock` class: holds the time, reads it again with `updateTime()`, shows it, and logs it |
| `src/main.ts` | finds the HTML elements, creates the `Clock`, and updates it when the button is clicked |
| `public/index.html` | the page: the time, the **Update display** button, and the log |

## Exercises

Do them in order - each one starts from your answer to the one before. Every project has all six exercises;
this one is the solution to exercise 2.

| Exercise | What you build | Solution |
|----------|----------------|----------|
| [1 - simple](README_ex1_simple.md) | shows the time once, when the page loads | `mvc_clock1/` |
| [2 - interactive](README_ex2_interactive.md) | an **Update display** button, and a log | `mvc_clock2/` |
| [3 - bumpers](README_ex3_bumpers.md) | buttons to move the time up and down, for testing | `mvc_clock3/` |
| [4 - 24 and 12 hour](README_ex4_24_and_12_hour.md) | two displays of the same time | `mvc_clock4/` |
| [5 - MVC](README_ex5_MVC.md) | the same clock, rebuilt with Model-View-Controller | `mvc_clock5/` |
| [6 - alarms](README_ex6_alarms.md) | an alarm that makes the displays flash | `mvc_clock6/` |

## Running it

Open this folder in Celbridge (`mvc_clock2.celbridge`). The console at the bottom starts by itself, and runs
`deno task dev`, which builds `src/` and `public/` into `dist/`, runs the tests, and does it all again on
every save.

Without Celbridge: run `deno task dev` from a terminal in this folder, and open `dist/index.html` in any
browser.
