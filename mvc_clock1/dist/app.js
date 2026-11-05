(() => {
  // src/Clock.ts
  var Clock = class {
    hours;
    minutes;
    displayElement;
    constructor(displayElement) {
      this.displayElement = displayElement;
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
  };

  // src/main.ts
  var timeElement = document.getElementById("time");
  var clock = new Clock(timeElement);
  clock.display();
})();
