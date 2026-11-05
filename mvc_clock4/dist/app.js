(() => {
  // src/Clock.ts
  var MINUTES_PER_DAY = 24 * 60;
  var Clock = class {
    hours = 0;
    minutes = 0;
    display24Element;
    display12Element;
    logElement;
    constructor(display24Element, display12Element, logElement2) {
      this.display24Element = display24Element;
      this.display12Element = display12Element;
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
    // The time in 24 hour form, e.g. "09:05" or "21:05"
    getTime24String() {
      const hh = String(this.hours).padStart(2, "0");
      const mm = String(this.minutes).padStart(2, "0");
      return `${hh}:${mm}`;
    }
    // The time in 12 hour form, e.g. "9:05 am" or "9:05 pm"
    getTime12String() {
      const amPm = this.hours < 12 ? "am" : "pm";
      const hours12 = this.hours % 12 === 0 ? 12 : this.hours % 12;
      const mm = String(this.minutes).padStart(2, "0");
      return `${hours12}:${mm} ${amPm}`;
    }
    // Shows the time on the HTML page, in both forms
    display() {
      this.display24Element.textContent = this.getTime24String();
      this.display12Element.textContent = this.getTime12String();
    }
    // Adds the time as a new line in the log textarea, and scrolls down so the newest line is visible
    log() {
      this.logElement.value += `Clock time: ${this.getTime24String()} (${this.getTime12String()})
`;
      this.logElement.scrollTop = this.logElement.scrollHeight;
    }
  };

  // src/main.ts
  var time24Element = document.getElementById("time-24");
  var time12Element = document.getElementById("time-12");
  var logElement = document.getElementById("log");
  var clock = new Clock(time24Element, time12Element, logElement);
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
