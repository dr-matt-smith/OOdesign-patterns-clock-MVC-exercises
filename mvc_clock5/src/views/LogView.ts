// LogView.ts - a VIEW: adds a line to the log textarea every time the model changes.

import type { ClockModel } from "../ClockModel.ts";
import type { Observer } from "../Observer.ts";
import { format24 } from "../timeFormat.ts";

export class LogView implements Observer<ClockModel> {
  private logElement: HTMLTextAreaElement;

  constructor(logElement: HTMLTextAreaElement) {
    this.logElement = logElement;
  }

  update(model: ClockModel): void {
    this.logElement.value += `Clock time: ${format24(model.getHours(), model.getMinutes())}\n`;
    this.logElement.scrollTop = this.logElement.scrollHeight; // keep the newest line visible
  }
}
