// main.ts finds the HTML element for the time, creates the clock, and shows the time.

import { Clock } from "./Clock.ts";

const timeElement = document.getElementById("time") as HTMLElement;

const clock = new Clock(timeElement);
clock.display();
