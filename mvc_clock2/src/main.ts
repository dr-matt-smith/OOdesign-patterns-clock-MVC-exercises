// main.ts wires everything together: it finds the HTML elements, creates the clock,
// and updates the clock each time the user clicks the "Update display" button.

import { Clock } from "./Clock.ts";

const timeElement = document.getElementById("time") as HTMLElement;
const updateButton = document.getElementById("update-button") as HTMLButtonElement;
const logElement = document.getElementById("log") as HTMLTextAreaElement;

const clock = new Clock(timeElement, logElement);

updateButton.addEventListener("click", () => {
  clock.updateTime(); // (1) read the current time
  clock.display();    // (2) show it on the page
  clock.log();        // (3) add it to the log on the page
});
