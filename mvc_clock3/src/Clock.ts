// Clock.ts - a simple clock that does EVERYTHING itself:
//   - it holds the time (the data), and changes it when asked (the bumper buttons)
//   - it shows the time on the HTML page, and adds it to the log on the page (the output)

const MINUTES_PER_DAY = 24 * 60;

export class Clock {
  private hours = 0;
  private minutes = 0;
  private displayElement: HTMLElement;
  private logElement: HTMLTextAreaElement;

  constructor(displayElement: HTMLElement, logElement: HTMLTextAreaElement) {
    this.displayElement = displayElement;
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

  // The time as "HH:MM", e.g. "09:05"
  getTimeString(): string {
    const hh = String(this.hours).padStart(2, "0");
    const mm = String(this.minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // Shows the time on the HTML page
  display(): void {
    this.displayElement.textContent = this.getTimeString();
  }

  // Adds the time as a new line in the log textarea, and scrolls down so the newest line is visible
  log(): void {
    this.logElement.value += `Clock time: ${this.getTimeString()}\n`;
    this.logElement.scrollTop = this.logElement.scrollHeight;
  }
}
