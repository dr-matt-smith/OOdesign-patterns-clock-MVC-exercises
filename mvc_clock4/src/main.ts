// main.ts wires everything together: it finds the HTML elements, creates the clock,
// and changes the clock each time the user clicks one of the buttons.

import { Clock } from "./Clock.ts";

const time24Element = document.getElementById("time-24") as HTMLElement;
const time12Element = document.getElementById("time-12") as HTMLElement;
const logElement = document.getElementById("log") as HTMLTextAreaElement;

const clock = new Clock(time24Element, time12Element, logElement);

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
