// Clock.ts - a simple clock that does EVERYTHING itself:
//   - it holds the time (the data)
//   - it shows the time on the HTML page, and adds it to the log on the page (the output)
// Later we will split these jobs apart with the MVC design pattern.

export class Clock {
  private hours = 0;
  private minutes = 0;
  private displayElement: HTMLElement;
  private logElement: HTMLTextAreaElement;

  constructor(displayElement: HTMLElement, logElement: HTMLTextAreaElement) {
    this.displayElement = displayElement;
    this.logElement = logElement;
  }

  // Reads the current time from the computer's clock
  updateTime(): void {
    const now = new Date();
    this.hours = now.getHours();
    this.minutes = now.getMinutes();
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
