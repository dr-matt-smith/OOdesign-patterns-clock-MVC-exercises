// ClockController.ts - the CONTROLLER: turns the user's input (button clicks) into changes to the model.
// It never touches the displays or the log - the model tells the views about every change.

import type { ClockModel } from "./ClockModel.ts";

export class ClockController {
  private model: ClockModel;

  constructor(model: ClockModel) {
    this.model = model;
  }

  // Connects each button on the page to a change to the model
  connectButtons(): void {
    this.onClick("hour-up", () => this.model.addHours(1));
    this.onClick("hour-down", () => this.model.addHours(-1));
    this.onClick("minute-up", () => this.model.addMinutes(1));
    this.onClick("minute-down", () => this.model.addMinutes(-1));
    this.onClick("now-button", () => this.model.setToNow());
  }

  private onClick(buttonId: string, action: () => void): void {
    const button = document.getElementById(buttonId) as HTMLButtonElement;
    button.addEventListener("click", action);
  }
}
