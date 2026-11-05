// Time24View.ts - a VIEW: shows the model's time in 24 hour form.

import type { ClockModel } from "../ClockModel.ts";
import type { Observer } from "../Observer.ts";
import { format24 } from "../timeFormat.ts";

export class Time24View implements Observer<ClockModel> {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(model: ClockModel): void {
    this.element.textContent = format24(model.getHours(), model.getMinutes());
  }
}
