// AlarmView.ts - a VIEW: shows whether an alarm is set, and whether it is ringing.

import type { ClockModel } from "../ClockModel.ts";
import type { Observer } from "../Observer.ts";
import { format24 } from "../timeFormat.ts";

export class AlarmView implements Observer<ClockModel> {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  update(model: ClockModel): void {
    const alarm = model.getAlarm();
    if (alarm === null) {
      this.element.textContent = "Alarm: off";
    } else if (model.isAlarmRinging()) {
      this.element.textContent = `Alarm: ${format24(alarm.hours, alarm.minutes)} - RINGING!`;
    } else {
      this.element.textContent = `Alarm: ${format24(alarm.hours, alarm.minutes)}`;
    }
    this.element.classList.toggle("ringing", model.isAlarmRinging());
  }
}
