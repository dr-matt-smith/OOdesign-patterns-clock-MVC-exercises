// ClockModel.ts - the MODEL: the clock's data (the time and the alarm), and the rules for changing it.
// It knows nothing about HTML, buttons or the log. When it changes, it tells its observers (the views):
// adding observers and notifying them is inherited from Subject.

import { Subject } from "./Subject.ts";

const MINUTES_PER_DAY = 24 * 60;

export class ClockModel extends Subject {
  private hours = 0;
  private minutes = 0;
  private alarm: { hours: number; minutes: number } | null = null; // null = no alarm set

  // --- reading the time ---

  getHours(): number {
    return this.hours;
  }

  getMinutes(): number {
    return this.minutes;
  }

  // --- changing the time: every change ends by notifying the observers ---

  setTime(hours: number, minutes: number): void {
    this.hours = hours;
    this.minutes = minutes;
    this.notifyObservers();
  }

  // Sets the clock to the current time, from the computer's clock
  setToNow(): void {
    const now = new Date();
    this.setTime(now.getHours(), now.getMinutes());
  }

  // Moves the time forward (or back, if minutesToAdd is negative), wrapping round midnight
  addMinutes(minutesToAdd: number): void {
    const totalMinutes = this.hours * 60 + this.minutes + minutesToAdd;
    // % can give a negative answer in TypeScript (-1 % 1440 is -1), so add MINUTES_PER_DAY and % again
    const wrapped = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    this.setTime(Math.floor(wrapped / 60), wrapped % 60);
  }

  addHours(hoursToAdd: number): void {
    this.addMinutes(hoursToAdd * 60);
  }

  // --- the alarm ---

  setAlarm(hours: number, minutes: number): void {
    this.alarm = { hours, minutes };
    this.notifyObservers();
  }

  clearAlarm(): void {
    this.alarm = null;
    this.notifyObservers();
  }

  getAlarm(): { hours: number; minutes: number } | null {
    return this.alarm;
  }

  // true when an alarm is set, and the clock's time is the alarm time
  isAlarmRinging(): boolean {
    return this.alarm !== null && this.alarm.hours === this.hours && this.alarm.minutes === this.minutes;
  }
}
