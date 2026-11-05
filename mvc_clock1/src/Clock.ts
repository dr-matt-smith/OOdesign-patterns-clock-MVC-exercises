// Clock.ts - a simple clock. It reads the time once, when it is created, and can show it on the page.

export class Clock {
  private hours: number;
  private minutes: number;
  private displayElement: HTMLElement;

  constructor(displayElement: HTMLElement) {
    this.displayElement = displayElement;

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
}
