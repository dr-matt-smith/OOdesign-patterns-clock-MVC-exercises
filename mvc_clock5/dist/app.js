(() => {
  // src/ClockController.ts
  var ClockController = class {
    model;
    constructor(model2) {
      this.model = model2;
    }
    // Connects each button on the page to a change to the model
    connectButtons() {
      this.onClick("hour-up", () => this.model.addHours(1));
      this.onClick("hour-down", () => this.model.addHours(-1));
      this.onClick("minute-up", () => this.model.addMinutes(1));
      this.onClick("minute-down", () => this.model.addMinutes(-1));
      this.onClick("now-button", () => this.model.setToNow());
    }
    onClick(buttonId, action) {
      const button = document.getElementById(buttonId);
      button.addEventListener("click", action);
    }
  };

  // src/Subject.ts
  var Subject = class {
    observers = [];
    addObserver(observer) {
      this.observers.push(observer);
    }
    removeObserver(observer) {
      this.observers = this.observers.filter((o) => o !== observer);
    }
    // protected: subclasses can call it (after they change), but other classes can't
    notifyObservers() {
      for (const observer of this.observers) {
        observer.update(this);
      }
    }
  };

  // src/ClockModel.ts
  var MINUTES_PER_DAY = 24 * 60;
  var ClockModel = class extends Subject {
    hours = 0;
    minutes = 0;
    // --- reading the time ---
    getHours() {
      return this.hours;
    }
    getMinutes() {
      return this.minutes;
    }
    // --- changing the time: every change ends by notifying the observers ---
    setTime(hours, minutes) {
      this.hours = hours;
      this.minutes = minutes;
      this.notifyObservers();
    }
    // Sets the clock to the current time, from the computer's clock
    setToNow() {
      const now = /* @__PURE__ */ new Date();
      this.setTime(now.getHours(), now.getMinutes());
    }
    // Moves the time forward (or back, if minutesToAdd is negative), wrapping round midnight
    addMinutes(minutesToAdd) {
      const totalMinutes = this.hours * 60 + this.minutes + minutesToAdd;
      const wrapped = (totalMinutes % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;
      this.setTime(Math.floor(wrapped / 60), wrapped % 60);
    }
    addHours(hoursToAdd) {
      this.addMinutes(hoursToAdd * 60);
    }
  };

  // src/timeFormat.ts
  function format24(hours, minutes) {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    return `${hh}:${mm}`;
  }
  function format12(hours, minutes) {
    const amPm = hours < 12 ? "am" : "pm";
    const hours12 = hours % 12 === 0 ? 12 : hours % 12;
    const mm = String(minutes).padStart(2, "0");
    return `${hours12}:${mm} ${amPm}`;
  }

  // src/views/LogView.ts
  var LogView = class {
    logElement;
    constructor(logElement2) {
      this.logElement = logElement2;
    }
    update(model2) {
      this.logElement.value += `Clock time: ${format24(model2.getHours(), model2.getMinutes())}
`;
      this.logElement.scrollTop = this.logElement.scrollHeight;
    }
  };

  // src/views/Time12View.ts
  var Time12View = class {
    element;
    constructor(element) {
      this.element = element;
    }
    update(model2) {
      this.element.textContent = format12(model2.getHours(), model2.getMinutes());
    }
  };

  // src/views/Time24View.ts
  var Time24View = class {
    element;
    constructor(element) {
      this.element = element;
    }
    update(model2) {
      this.element.textContent = format24(model2.getHours(), model2.getMinutes());
    }
  };

  // src/main.ts
  var time24Element = document.getElementById("time-24");
  var time12Element = document.getElementById("time-12");
  var logElement = document.getElementById("log");
  var model = new ClockModel();
  model.addObserver(new Time24View(time24Element));
  model.addObserver(new Time12View(time12Element));
  model.addObserver(new LogView(logElement));
  var controller = new ClockController(model);
  controller.connectButtons();
  model.setToNow();
})();
