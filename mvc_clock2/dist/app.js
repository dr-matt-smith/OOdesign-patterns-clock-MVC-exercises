(() => {
  // src/Clock.ts
  var Clock = class {
    hours = 0;
    minutes = 0;
    displayElement;
    logElement;
    constructor(displayElement, logElement2) {
      this.displayElement = displayElement;
      this.logElement = logElement2;
    }
    // Reads the current time from the computer's clock
    updateTime() {
      const now = /* @__PURE__ */ new Date();
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
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
  var updateButton = document.getElementById("update-button");
  var logElement = document.getElementById("log");
  var clock = new Clock(timeElement, logElement);
  updateButton.addEventListener("click", () => {
    clock.updateTime();
    clock.display();
    clock.log();
  });
})();
