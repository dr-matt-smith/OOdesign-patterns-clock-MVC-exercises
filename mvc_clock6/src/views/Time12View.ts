// Time12View.ts - a VIEW: shows the model's time in 12 hour form.

import type { ClockModel } from "../ClockModel.ts";
import type { Observer } from "../Observer.ts";
import { format12 } from "../timeFormat.ts";

export class Time12View implements Observer<ClockModel> {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(model: ClockModel): void {
    this.element.textContent = format12(model.getHours(), model.getMinutes());
    this.element.classList.toggle("ringing", model.isAlarmRinging()); // adds the class when ringing, removes it when not
  }
}
