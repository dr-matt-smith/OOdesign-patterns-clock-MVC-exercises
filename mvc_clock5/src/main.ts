// main.ts creates the model, the views and the controller, and connects them together.

import { ClockController } from "./ClockController.ts";
import { ClockModel } from "./ClockModel.ts";
import { LogView } from "./views/LogView.ts";
import { Time12View } from "./views/Time12View.ts";
import { Time24View } from "./views/Time24View.ts";

// (1) the HTML elements that the views draw in
const time24Element = document.getElementById("time-24") as HTMLElement;
const time12Element = document.getElementById("time-12") as HTMLElement;
const logElement = document.getElementById("log") as HTMLTextAreaElement;

// (2) the model
const model = new ClockModel();

// (3) the views - create each one, and add it to the model as an observer
model.addObserver(new Time24View(time24Element));
model.addObserver(new Time12View(time12Element));
model.addObserver(new LogView(logElement));

// (4) the controller - turns button clicks into changes to the model
const controller = new ClockController(model);
controller.connectButtons();

// (5) start at the current time - this notifies the views, so they draw for the first time
model.setToNow();
