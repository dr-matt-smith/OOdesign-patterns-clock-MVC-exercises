# Clock 5 - MVC: Model, View, Controller - `mvc_clock5/`

**Solution** to [exercise 5 - MVC: Model, View, Controller](README_ex5_MVC.md).

The exercise 4 clock, rebuilt with the Model-View-Controller design pattern. It looks and behaves the same, but the model has no HTML in it, the views observe the model (the model extends an abstract `Subject` class), and the model is tested automatically.

## The code

| File | What it does |
|------|--------------|
| `src/ClockModel.ts` | the **model**: the time, and the rules for changing it. It extends `Subject` |
| `src/Subject.ts` | the abstract **Subject** of the Observer pattern: the list of observers, adding, removing and notifying them |
| `src/Observer.ts` | the **Observer** interface every view implements: `update(subject)` |
| `src/views/Time24View.ts` | a **view**: the 24 hour display |
| `src/views/Time12View.ts` | a **view**: the 12 hour display |
| `src/views/LogView.ts` | a **view**: the log |
| `src/timeFormat.ts` | `format24()` and `format12()`, used by the views |
| `src/ClockController.ts` | the **controller**: turns button clicks into changes to the model |
| `src/main.ts` | creates the model, the views and the controller, and connects them |
| `tests/` | automatic tests of the model and the time formats |

## Exercises

Do them in order - each one starts from your answer to the one before. Every project has all six exercises;
this one is the solution to exercise 5.

| Exercise | What you build | Solution |
|----------|----------------|----------|
| [1 - simple](README_ex1_simple.md) | shows the time once, when the page loads | `mvc_clock1/` |
| [2 - interactive](README_ex2_interactive.md) | an **Update display** button, and a log | `mvc_clock2/` |
| [3 - bumpers](README_ex3_bumpers.md) | buttons to move the time up and down, for testing | `mvc_clock3/` |
| [4 - 24 and 12 hour](README_ex4_24_and_12_hour.md) | two displays of the same time | `mvc_clock4/` |
| [5 - MVC](README_ex5_MVC.md) | the same clock, rebuilt with Model-View-Controller | `mvc_clock5/` |
| [6 - alarms](README_ex6_alarms.md) | an alarm that makes the displays flash | `mvc_clock6/` |

## Running it

Open this folder in Celbridge (`mvc_clock5.celbridge`). The console at the bottom starts by itself, and runs
`deno task dev`, which builds `src/` and `public/` into `dist/`, runs the tests, and does it all again on
every save.

Without Celbridge: run `deno task dev` from a terminal in this folder, and open `dist/index.html` in any
browser.
