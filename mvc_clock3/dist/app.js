(() => {
  // src/Clock.ts
  var MINUTES_PER_DAY = 24 * 60;
  var Clock = class {
    hours = 0;
    minutes = 0;
    displayElement;
    logElement;
    constructor(displayElement, logElement2) {
      this.displayElement = displayElement;
      this.logElement = logElement2;
    }
    // Sets the clock to the current time, from the computer's clock
    updateTime() {
      const now = /* @__PURE__ */ new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
    }
    // Moves the time forward (or back, if minutesToAdd is negative), wrapping round midnight
    addMinutes(minutesToAdd) {
      const totalMinutes = this.hours * 60 + this.minutes + minutesToAdd;
      const wrapped = (totalMinutes % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
      this.hours = Math.floor(wrapped / 60);
      this.minutes = wrapped % 60;
    }
    addHours(hoursToAdd) {
      this.addMinutes(hoursToAdd * 60);
    }
    // The time as "HH:MM", e.g. "09:05"
    getTimeString() {
      const hh = String(this.hours).padStart(2, "0");
      const mm = String(this.minutes).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    // Shows the time on the HTML page
    display() {
      this.displayElement.textContent = this.getTimeString();
    }
    // Adds the time as a new line in the log textarea, and scrolls down so the newest line is visible
    log() {
      this.logElement.value += `Clock time: ${this.getTimeString()}
`;
      this.logElement.scrollTop = this.logElement.scrollHeight;
    }
  };

  // src/main.ts
  var timeElement = document.getElementById("time");
  var logElement = document.getElementById("log");
  var clock = new Clock(timeElement, logElement);
  function showTime() {
    clock.display();
    clock.log();
  }
  function onClick(id, change) {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      change();
      showTime();
    });
  }
  onClick("hour-up", () => clock.addHours(1));
  onClick("hour-down", () => clock.addHours(-1));
  onClick("minute-up", () => clock.addMinutes(1));
  onClick("minute-down", () => clock.addMinutes(-1));
  onClick("now-button", () => clock.updateTime());
  clock.updateTime();
  showTime();
})();
