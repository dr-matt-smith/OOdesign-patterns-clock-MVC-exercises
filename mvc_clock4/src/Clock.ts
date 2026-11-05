// Clock.ts - a simple clock that does EVERYTHING itself:
//   - it holds the time (the data), and changes it when asked (the bumper buttons)
//   - it shows the time on the HTML page, in 24 hour AND 12 hour form, and adds it to the log (the output)

const MINUTES_PER_DAY = 24 * 60;

export class Clock {
  private hours = 0;
  private minutes = 0;
  private display24Element: HTMLElement;
  private display12Element: HTMLElement;
  private logElement: HTMLTextAreaElement;

  constructor(display24Element: HTMLElement, display12Element: HTMLElement, logElement: HTMLTextAreaElement) {
    this.display24Element = display24Element;
    this.display12Element = display12Element;
    this.logElement = logElement;
  }

  // Sets the clock to the current time, from the computer's clock
  updateTime(): void {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
  }

  // Moves the time forward (or back, if minutesToAdd is negative), wrapping round midnight
  addMinutes(minutesToAdd: number): void {
    const totalMinutes = this.hours * 60 + this.minutes + minutesToAdd;
    // % can give a negative answer in TypeScript (-1 % 1440 is -1), so add MINUTES_PER_DAY and % again
    const wrapped = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
    this.hours = Math.floor(wrapped / 60);
    this.minutes = wrapped % 60;
  }

  addHours(hoursToAdd: number): void {
    this.addMinutes(hoursToAdd * 60);
  }

  // The time in 24 hour form, e.g. "09:05" or "21:05"
  getTime24String(): string {
    const hh = String(this.hours).padStart(2, "0");
    const mm = String(this.minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // The time in 12 hour form, e.g. "9:05 am" or "9:05 pm"
  getTime12String(): string {
    const amPm = this.hours < 12 ? "am" : "pm";
    const hours12 = this.hours % 12 === 0 ? 12 : this.hours % 12; // 0 -> 12 (midnight), 13 -> 1, ...
    const mm = String(this.minutes).padStart(2, "0");
    return `${hours12}:${mm} ${amPm}`;
  }

  // Shows the time on the HTML page, in both forms
  display(): void {
    this.display24Element.textContent = this.getTime24String();
    this.display12Element.textContent = this.getTime12String();
  }

  // Adds the time as a new line in the log textarea, and scrolls down so the newest line is visible
  log(): void {
    this.logElement.value += `Clock time: ${this.getTime24String()} (${this.getTime12String()})\n`;
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }
}
