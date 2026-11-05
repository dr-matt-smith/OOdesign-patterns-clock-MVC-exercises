# Clock 1 - a simple clock - `mvc_clock1/`

**Solution** to [exercise 1 - a simple clock](README_ex1_simple.md).

Shows the current time, once, when the page loads. No buttons, no log: the time is read when the `Clock` is created.

## The code

| File | What it does |
|------|--------------|
| `src/Clock.ts` | the `Clock` class: reads the time in its constructor, and shows it on the page |
| `src/main.ts` | finds the HTML element, creates a `Clock`, and shows the time |
| `public/index.html` | the page, with one element for the time |

## Exercises

Do them in order - each one starts from your answer to the one before. Every project has all six exercises;
this one is the solution to exercise 1.

| Exercise | What you build | Solution |
|----------|----------------|----------|
| [1 - simple](README_ex1_simple.md) | shows the time once, when the page loads | `mvc_clock1/` |
| [2 - interactive](README_ex2_interactive.md) | an **Update display** button, and a log | `mvc_clock2/` |
| [3 - bumpers](README_ex3_bumpers.md) | buttons to move the time up and down, for testing | `mvc_clock3/` |
| [4 - 24 and 12 hour](README_ex4_24_and_12_hour.md) | two displays of the same time | `mvc_clock4/` |
| [5 - MVC](README_ex5_MVC.md) | the same clock, rebuilt with Model-View-Controller | `mvc_clock5/` |
| [6 - alarms](README_ex6_alarms.md) | an alarm that makes the displays flash | `mvc_clock6/` |

## Running it

Open this folder in Celbridge (`mvc_clock1.celbridge`). The console at the bottom starts by itself, and runs
`deno task dev`, which builds `src/` and `public/` into `dist/`, runs the tests, and does it all again on
every save.

Without Celbridge: run `deno task dev` from a terminal in this folder, and open `dist/index.html` in any
browser.
